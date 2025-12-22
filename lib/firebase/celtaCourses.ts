import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getDb } from "./client";

export interface CeltaCourse {
  id?: string;
  format: "Full-time" | "Part-time";
  startDate: string; // ISO date "YYYY-MM-DD"
  endDate: string; // ISO date "YYYY-MM-DD"
  schedule: string;
  priceAMD: number;
  applicationDeadline: string; // ISO date "YYYY-MM-DD"
  status: "Open" | "Closed" | "Applications open soon";
  seats?: number;
  earlyBirdDeadline?: string; // ISO date "YYYY-MM-DD" (deprecated, use earlyBirdApplicationDeadline)
  earlyBirdApplicationDeadline?: string; // ISO date "YYYY-MM-DD"
  earlyBirdDiscountAMD?: number;
  paymentDeadline?: string; // ISO date "YYYY-MM-DD"
  earlyBirdPaymentDeadline?: string; // ISO date "YYYY-MM-DD"
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CeltaCourseInput {
  format: "Full-time" | "Part-time";
  startDate: string;
  endDate: string;
  schedule: string;
  priceAMD: number;
  applicationDeadline: string;
  status: "Open" | "Closed" | "Applications open soon";
  seats?: number;
  earlyBirdDeadline?: string; // Deprecated, use earlyBirdApplicationDeadline
  earlyBirdApplicationDeadline?: string;
  earlyBirdDiscountAMD?: number;
  paymentDeadline?: string;
  earlyBirdPaymentDeadline?: string;
}

export async function listCeltaCourses(): Promise<CeltaCourse[]> {
  const db = getDb();
  const coursesRef = collection(db, "celtaCourses");
  const q = query(coursesRef, orderBy("startDate", "asc"));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CeltaCourse[];
}

// Helper function to remove undefined values from object
function removeUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
  const cleaned: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  }
  return cleaned;
}

export async function createCeltaCourse(data: CeltaCourseInput): Promise<string> {
  const db = getDb();
  const coursesRef = collection(db, "celtaCourses");
  
  // Remove undefined values before saving
  const cleanedData = removeUndefined(data);
  
  const docRef = await addDoc(coursesRef, {
    ...cleanedData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCeltaCourse(
  id: string,
  data: Partial<CeltaCourseInput>
): Promise<void> {
  const db = getDb();
  const courseRef = doc(db, "celtaCourses", id);
  
  // Remove undefined values before updating
  const cleanedData = removeUndefined(data);
  
  await updateDoc(courseRef, {
    ...cleanedData,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCeltaCourse(id: string): Promise<void> {
  const db = getDb();
  const courseRef = doc(db, "celtaCourses", id);
  await deleteDoc(courseRef);
}

