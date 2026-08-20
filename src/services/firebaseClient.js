// Web Firebase Client Setup (Modular Service Abstraction)

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "demo-firebase-api-key",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "workconnect-demo.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "workconnect-demo",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "workconnect-demo.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

export const isFirebaseConfigured = () => {
  return !!(process.env.VITE_FIREBASE_API_KEY && process.env.VITE_FIREBASE_PROJECT_ID);
};

export default firebaseConfig;
