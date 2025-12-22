import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app only once (client-side only)
let firebaseApp: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

// Internal function to get auth instance
function getAuthInstanceInternal(): Auth {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth can only be accessed on the client side");
  }
  
  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp());
  }
  return authInstance;
}

function getFirebaseApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("Firebase can only be initialized on the client side");
  }
  
  // Validate config
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    const missing = [];
    if (!firebaseConfig.apiKey) missing.push("NEXT_PUBLIC_FIREBASE_API_KEY");
    if (!firebaseConfig.projectId) missing.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
    throw new Error(
      `Firebase configuration is missing. Please set the following environment variables in .env.local: ${missing.join(", ")}`
    );
  }
  
  if (!firebaseApp) {
    try {
      if (getApps().length === 0) {
        firebaseApp = initializeApp(firebaseConfig);
      } else {
        firebaseApp = getApp();
      }
    } catch (error: any) {
      if (error.code === "auth/invalid-api-key") {
        throw new Error(
          "Invalid Firebase API key. Please check your NEXT_PUBLIC_FIREBASE_API_KEY in .env.local"
        );
      }
      throw error;
    }
  }
  return firebaseApp;
}

function getDbInstance(): Firestore {
  if (typeof window === "undefined") {
    throw new Error("Firestore can only be accessed on the client side");
  }
  
  if (!dbInstance) {
    dbInstance = getFirestore(getFirebaseApp());
  }
  return dbInstance;
}

function getStorageInstanceInternal(): FirebaseStorage {
  if (typeof window === "undefined") {
    throw new Error("Firebase Storage can only be accessed on the client side");
  }
  
  if (!storageInstance) {
    storageInstance = getStorage(getFirebaseApp());
  }
  return storageInstance;
}

// Export getters (lazy initialization - only called in client components)
// The Proxy checks for browser environment before accessing Firebase
export const auth = new Proxy({} as Auth, {
  get(_target, prop) {
    if (typeof window === "undefined") {
      throw new Error("Firebase Auth can only be accessed on the client side");
    }
    return getAuthInstanceInternal()[prop as keyof Auth];
  },
});

// Export db as a getter function to ensure proper Firestore instance
// This is needed because Firestore functions like collection() require the actual instance
export function getDb(): Firestore {
  if (typeof window === "undefined") {
    throw new Error("Firestore can only be accessed on the client side");
  }
  return getDbInstance();
}

// Also export as a Proxy for backward compatibility with auth-like usage
// But prefer using getDb() for Firestore operations
export const db = new Proxy({} as Firestore, {
  get(_target, prop) {
    if (typeof window === "undefined") {
      throw new Error("Firestore can only be accessed on the client side");
    }
    const instance = getDbInstance();
    const value = instance[prop as keyof Firestore];
    // If it's a function, bind it to the instance
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});

// Export storage getter
export function getStorageInstance(): FirebaseStorage {
  if (typeof window === "undefined") {
    throw new Error("Firebase Storage can only be accessed on the client side");
  }
  return getStorageInstanceInternal();
}

// Export the app instance getter
export function getFirebaseAppInstance(): FirebaseApp {
  return getFirebaseApp();
}

// Export auth instance getter for functions that need the actual instance
// This is needed for functions like signInWithEmailAndPassword that need the real Auth instance
export function getAuthInstance(): Auth {
  return getAuthInstanceInternal();
}

