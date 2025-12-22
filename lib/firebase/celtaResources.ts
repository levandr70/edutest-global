import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getDb } from "./client";
import { getStorageInstance } from "./client";

export type CeltaResourceCategory = "application_form" | "pre_interview_task" | "other";

export interface CeltaResource {
  id?: string;
  category: CeltaResourceCategory;
  title: string;
  description?: string;
  fileUrl?: string;
  filePath?: string;
  fileName?: string;
  fileType?: string;
  order: number;
  isActive: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CeltaResourceInput {
  category: CeltaResourceCategory;
  title: string;
  description?: string;
  fileUrl?: string;
  filePath?: string;
  fileName?: string;
  fileType?: string;
  order: number;
  isActive: boolean;
}

export async function listCeltaResources(): Promise<CeltaResource[]> {
  const db = getDb();
  const resourcesRef = collection(db, "celtaResources");
  
  // Order by category asc, order asc, title asc
  const q = query(
    resourcesRef,
    orderBy("category", "asc"),
    orderBy("order", "asc"),
    orderBy("title", "asc")
  );
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CeltaResource[];
}

export async function listActiveCeltaResources(): Promise<CeltaResource[]> {
  const db = getDb();
  const resourcesRef = collection(db, "celtaResources");
  
  // Filter by isActive == true, then order by category asc, order asc, title asc
  const q = query(
    resourcesRef,
    where("isActive", "==", true),
    orderBy("category", "asc"),
    orderBy("order", "asc"),
    orderBy("title", "asc")
  );
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CeltaResource[];
}

export interface LatestResources {
  applicationForm?: CeltaResource;
  preInterviewTask?: CeltaResource;
}

export async function getLatestResources(): Promise<LatestResources> {
  const resources = await listActiveCeltaResources();
  
  // Filter by category
  const applicationForms = resources.filter((r) => r.category === "application_form");
  const preInterviewTasks = resources.filter((r) => r.category === "pre_interview_task");
  
  // Helper to find the best resource (lowest order, then newest updatedAt)
  const findBest = (items: CeltaResource[]): CeltaResource | undefined => {
    if (items.length === 0) return undefined;
    
    return items.reduce((best, current) => {
      if (!best) return current;
      
      // Compare by order (lower is better)
      if (current.order < best.order) return current;
      if (current.order > best.order) return best;
      
      // If order is equal, compare by updatedAt (newer is better)
      if (current.updatedAt && best.updatedAt) {
        const currentTime = current.updatedAt.toMillis();
        const bestTime = best.updatedAt.toMillis();
        return currentTime > bestTime ? current : best;
      }
      
      // If one has updatedAt and the other doesn't, prefer the one with updatedAt
      if (current.updatedAt && !best.updatedAt) return current;
      if (!current.updatedAt && best.updatedAt) return best;
      
      return best;
    });
  };
  
  return {
    applicationForm: findBest(applicationForms),
    preInterviewTask: findBest(preInterviewTasks),
  };
}

export async function createCeltaResource(
  data: Omit<CeltaResourceInput, "fileUrl" | "filePath" | "fileName" | "fileType">
): Promise<string> {
  const db = getDb();
  const resourcesRef = collection(db, "celtaResources");
  
  const docData: any = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  
  // Remove undefined values (Firestore doesn't allow undefined)
  Object.keys(docData).forEach((key) => {
    if (docData[key] === undefined) {
      delete docData[key];
    }
  });
  
  const docRef = await addDoc(resourcesRef, docData);
  return docRef.id;
}

export async function updateCeltaResource(
  id: string,
  data: Partial<CeltaResourceInput>
): Promise<void> {
  const db = getDb();
  const resourceRef = doc(db, "celtaResources", id);
  
  const updateData: any = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  
  // Remove undefined values
  Object.keys(updateData).forEach((key) => {
    if (updateData[key] === undefined) {
      delete updateData[key];
    }
  });
  
  await updateDoc(resourceRef, updateData);
}

export async function deleteCeltaResource(id: string): Promise<void> {
  const db = getDb();
  const resourceRef = doc(db, "celtaResources", id);
  await deleteDoc(resourceRef);
}

// Storage helpers
export async function uploadResourceFile(
  resourceId: string,
  file: File
): Promise<{ url: string; path: string; fileName: string; fileType: string }> {
  const storage = getStorageInstance();
  const fileName = file.name;
  const storagePath = `celtaResources/${resourceId}/${fileName}`;
  const storageRef = ref(storage, storagePath);
  
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  return {
    url: downloadURL,
    path: storagePath,
    fileName: fileName,
    fileType: file.type || "application/octet-stream",
  };
}

export async function deleteResourceFile(filePath: string): Promise<void> {
  try {
    const storage = getStorageInstance();
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
  } catch (error) {
    // Best-effort deletion - log but don't throw
    console.error("Error deleting file from storage:", error);
  }
}

