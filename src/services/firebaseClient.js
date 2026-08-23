// Web Firebase Client Setup (Modular Service Abstraction)
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_API_KEY) || (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_API_KEY) || "",
  authDomain: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN) || (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_AUTH_DOMAIN) || "",
  projectId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_PROJECT_ID) || (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_PROJECT_ID) || "",
  storageBucket: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET) || (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_STORAGE_BUCKET) || "",
  messagingSenderId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID) || (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_MESSAGING_SENDER_ID) || "",
  appId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_APP_ID) || (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_APP_ID) || ""
};

export const isFirebaseConfigured = () => {
  const apiKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_API_KEY) || (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_API_KEY);
  const projectId = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_PROJECT_ID) || (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_PROJECT_ID);
  return !!(apiKey && projectId);
};

let app = null;
let db = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    console.log("🔥 Firebase Client successfully initialized!");
  } catch (e) {
    console.error("Failed to initialize Firebase:", e);
  }
}

export { db };
export default firebaseConfig;
