import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getDb } from "./client";

export type ExamType = "toefl" | "gre" | "act";

export interface TestDate {
  id?: string;
  exam: ExamType;
  date: string; // ISO date "YYYY-MM-DD"
  sessions: number; // 1 or 2
  note?: string;
  isActive: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  createdBy?: string; // uid or email
  updatedBy?: string; // uid or email
  deletedAt?: Timestamp | null;
}

export interface TestDateInput {
  exam: ExamType;
  date: string; // ISO date "YYYY-MM-DD"
  sessions: number; // 1 or 2
  note?: string;
  isActive?: boolean;
}

/**
 * List test dates for a specific exam, optionally filtered by date range and active status
 * Excludes soft-deleted dates (deletedAt == null)
 * @param exam - Exam type ("toefl", "gre", "act")
 * @param fromISO - Optional start date (ISO string "YYYY-MM-DD")
 * @param toISO - Optional end date (ISO string "YYYY-MM-DD")
 * @param activeOnly - If true, only return active test dates (default: false)
 * @param includeDeleted - If true, include soft-deleted dates (default: false, admin only)
 * @returns Array of test dates
 */
export async function listTestDates(
  exam: string,
  fromISO?: string,
  toISO?: string,
  activeOnly: boolean = false,
  includeDeleted: boolean = false
): Promise<TestDate[]> {
  const db = getDb();
  const testDatesRef = collection(db, "testDates");
  
  const constraints: any[] = [where("exam", "==", exam)];
  
  if (fromISO) {
    constraints.push(where("date", ">=", fromISO));
  }
  
  if (toISO) {
    constraints.push(where("date", "<=", toISO));
  }
  
  if (activeOnly) {
    constraints.push(where("isActive", "==", true));
  }
  
  // Exclude soft-deleted dates unless explicitly included
  if (!includeDeleted) {
    constraints.push(where("deletedAt", "==", null));
  }
  
  constraints.push(orderBy("date", "asc"));
  
  const q = query(testDatesRef, ...constraints);
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TestDate[];
}

/**
 * Create a single test date
 * Document ID is `${exam}_${date}` to avoid duplicates
 * @param exam - Exam type
 * @param dateISO - Date in ISO format "YYYY-MM-DD"
 * @param sessions - Number of sessions (1 or 2)
 * @param note - Optional note
 * @param userEmail - User email or uid for createdBy/updatedBy
 * @returns true if created, false if duplicate
 */
export async function createSingleTestDate(
  exam: ExamType,
  dateISO: string,
  sessions: number,
  note?: string,
  userEmail?: string
): Promise<boolean> {
  const db = getDb();
  const docId = `${exam}_${dateISO}`;
  const testDateRef = doc(db, "testDates", docId);
  
  // Check if document exists and is not deleted
  const existingDoc = await getDoc(testDateRef);
  
  if (existingDoc.exists()) {
    const data = existingDoc.data();
    // If exists and not deleted, it's a duplicate
    if (!data.deletedAt) {
      return false;
    }
    // If deleted, restore it
  }
  
  const data: any = {
    exam,
    date: dateISO,
    sessions,
    isActive: true,
    deletedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  
  if (note !== undefined && note.trim() !== "") {
    data.note = note.trim();
  }
  
  if (userEmail) {
    data.createdBy = userEmail;
    data.updatedBy = userEmail;
  }
  
  await setDoc(testDateRef, data, { merge: true });
  return true;
}

/**
 * Create multiple test dates for a date range
 * Skips past dates, duplicates, and enforces 6-month max range
 * @param exam - Exam type
 * @param startDate - Start date (ISO string "YYYY-MM-DD")
 * @param endDate - End date (ISO string "YYYY-MM-DD")
 * @param sessions - Number of sessions (1 or 2)
 * @param note - Optional note
 * @param userEmail - User email or uid for createdBy/updatedBy
 * @returns Object with created count, skipped count, and past dates skipped
 */
export async function createBulkTestDates(
  exam: ExamType,
  startDate: string,
  endDate: string,
  sessions: number,
  note?: string,
  userEmail?: string
): Promise<{ created: number; skipped: number; pastSkipped: number }> {
  const db = getDb();
  let created = 0;
  let skipped = 0;
  let pastSkipped = 0;
  
  // Validate date range (max 6 months)
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");
  const sixMonthsLater = new Date(start);
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
  
  if (end > sixMonthsLater) {
    throw new Error("Date range cannot exceed 6 months");
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Generate all dates in range
  const dates: string[] = [];
  const current = new Date(start);
  while (current <= end) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const day = String(current.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;
    
    const dateOnly = new Date(current);
    dateOnly.setHours(0, 0, 0, 0);
    
    if (dateOnly < today) {
      pastSkipped++;
    } else {
      dates.push(dateStr);
    }
    
    current.setDate(current.getDate() + 1);
  }
  
  // Create dates
  for (const dateISO of dates) {
    const docId = `${exam}_${dateISO}`;
    const testDateRef = doc(db, "testDates", docId);
    const existingDoc = await getDoc(testDateRef);
    
    if (existingDoc.exists()) {
      const data = existingDoc.data();
      // Skip if exists and not deleted
      if (!data.deletedAt) {
        skipped++;
        continue;
      }
      // If deleted, restore it
    }
    
    const data: any = {
      exam,
      date: dateISO,
      sessions,
      isActive: true,
      deletedAt: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    if (note !== undefined && note.trim() !== "") {
      data.note = note.trim();
    }
    
    if (userEmail) {
      data.createdBy = userEmail;
      data.updatedBy = userEmail;
    }
    
    await setDoc(testDateRef, data, { merge: true });
    created++;
  }
  
  return { created, skipped, pastSkipped };
}

/**
 * Soft delete a test date
 * @param exam - Exam type
 * @param dateISO - Date in ISO format "YYYY-MM-DD"
 * @param userEmail - User email or uid for updatedBy
 */
export async function softDeleteTestDate(
  exam: ExamType,
  dateISO: string,
  userEmail?: string
): Promise<void> {
  const db = getDb();
  const docId = `${exam}_${dateISO}`;
  const testDateRef = doc(db, "testDates", docId);
  
  const updateData: any = {
    deletedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  
  if (userEmail) {
    updateData.updatedBy = userEmail;
  }
  
  await updateDoc(testDateRef, updateData);
}


/**
 * Update a test date's sessions
 * @param exam - Exam type
 * @param dateISO - Date in ISO format "YYYY-MM-DD"
 * @param sessions - Number of sessions (1 or 2)
 * @param userEmail - User email or uid for updatedBy
 */
export async function updateTestDateSessions(
  exam: ExamType,
  dateISO: string,
  sessions: number,
  userEmail?: string
): Promise<void> {
  const db = getDb();
  const docId = `${exam}_${dateISO}`;
  const testDateRef = doc(db, "testDates", docId);
  
  const updateData: any = {
    sessions,
    updatedAt: serverTimestamp(),
  };
  
  if (userEmail) {
    updateData.updatedBy = userEmail;
  }
  
  await updateDoc(testDateRef, updateData);
}

/**
 * Toggle a test date's active status
 * @param exam - Exam type
 * @param dateISO - Date in ISO format "YYYY-MM-DD"
 * @param isActive - New active status
 * @param userEmail - User email or uid for updatedBy
 */
export async function toggleTestDateActive(
  exam: ExamType,
  dateISO: string,
  isActive: boolean,
  userEmail?: string
): Promise<void> {
  const db = getDb();
  const docId = `${exam}_${dateISO}`;
  const testDateRef = doc(db, "testDates", docId);
  
  const updateData: any = {
    isActive,
    updatedAt: serverTimestamp(),
  };
  
  if (userEmail) {
    updateData.updatedBy = userEmail;
  }
  
  await updateDoc(testDateRef, updateData);
}

/**
 * Get test dates by exam and date range (for public calendar)
 * Only returns active, non-deleted dates
 * @param exam - Exam type
 * @param fromISO - Start date (ISO string "YYYY-MM-DD")
 * @param toISO - End date (ISO string "YYYY-MM-DD")
 * @returns Array of test dates
 */
export async function getTestDatesByExamAndRange(
  exam: ExamType,
  fromISO: string,
  toISO: string
): Promise<TestDate[]> {
  return listTestDates(exam, fromISO, toISO, true, false);
}

// Backward compatibility functions for old admin page
/**
 * @deprecated Use createSingleTestDate instead
 */
export async function upsertTestDate(
  exam: ExamType,
  dateISO: string,
  sessions: number,
  note?: string,
  isActive: boolean = true
): Promise<void> {
  await createSingleTestDate(exam, dateISO, sessions, note);
  if (!isActive) {
    await toggleTestDateActive(exam, dateISO, false);
  }
}

/**
 * @deprecated Use softDeleteTestDate instead
 */
export async function deleteTestDate(
  exam: ExamType,
  dateISO: string
): Promise<void> {
  await softDeleteTestDate(exam, dateISO);
}

/**
 * @deprecated Use createBulkTestDates instead
 */
export async function createManyTestDates(
  exam: ExamType,
  dates: string[],
  sessions: number
): Promise<{ created: number; skipped: number }> {
  if (dates.length === 0) {
    return { created: 0, skipped: 0 };
  }
  
  const startDate = dates[0];
  const endDate = dates[dates.length - 1];
  const result = await createBulkTestDates(exam, startDate, endDate, sessions);
  
  return {
    created: result.created,
    skipped: result.skipped + result.pastSkipped,
  };
}

