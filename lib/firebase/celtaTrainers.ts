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

export interface CeltaTrainer {
  id?: string;
  name: string;
  titleLine: string;
  bio: string;
  photoUrl?: string;
  photoPath?: string;
  order: number;
  isActive: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CeltaTrainerInput {
  name: string;
  titleLine: string;
  bio: string;
  photoUrl?: string;
  photoPath?: string;
  order: number;
  isActive: boolean;
}

export async function listCeltaTrainers(activeOnly: boolean = false): Promise<CeltaTrainer[]> {
  const db = getDb();
  const trainersRef = collection(db, "celtaTrainers");
  
  let q;
  if (activeOnly) {
    q = query(
      trainersRef,
      where("isActive", "==", true),
      orderBy("order", "asc"),
      orderBy("name", "asc")
    );
  } else {
    q = query(
      trainersRef,
      orderBy("order", "asc"),
      orderBy("name", "asc")
    );
  }
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CeltaTrainer[];
}

export async function createCeltaTrainer(data: Omit<CeltaTrainerInput, "photoUrl" | "photoPath">): Promise<string> {
  const db = getDb();
  const trainersRef = collection(db, "celtaTrainers");
  
  const docRef = await addDoc(trainersRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCeltaTrainer(
  id: string,
  data: Partial<CeltaTrainerInput>
): Promise<void> {
  const db = getDb();
  const trainerRef = doc(db, "celtaTrainers", id);
  
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
  
  await updateDoc(trainerRef, updateData);
}

export async function deleteCeltaTrainer(id: string): Promise<void> {
  const db = getDb();
  const trainerRef = doc(db, "celtaTrainers", id);
  await deleteDoc(trainerRef);
}

// Storage helpers
export async function uploadTrainerPhoto(
  trainerId: string,
  file: File
): Promise<{ url: string; path: string }> {
  const storage = getStorageInstance();
  const fileExtension = file.name.split(".").pop();
  const fileName = `photo.${fileExtension}`;
  const storagePath = `celtaTrainers/${trainerId}/${fileName}`;
  const storageRef = ref(storage, storagePath);
  
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  return { url: downloadURL, path: storagePath };
}

export async function deleteTrainerPhoto(photoPath: string): Promise<void> {
  try {
    const storage = getStorageInstance();
    const storageRef = ref(storage, photoPath);
    await deleteObject(storageRef);
  } catch (error) {
    // Best-effort deletion - log but don't throw
    console.error("Error deleting photo from storage:", error);
  }
}

