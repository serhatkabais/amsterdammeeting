import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const getValidValue = (envVal, fallbackVal) => {
  if (envVal && typeof envVal === 'string' && envVal.trim() !== '' && !envVal.includes('...')) {
    return envVal.trim();
  }
  return fallbackVal;
};

const firebaseConfig = {
  apiKey: getValidValue(import.meta.env.VITE_FIREBASE_API_KEY, "AIzaSyBjVUdZxv38d2Ew3togD3J-roNd08b3WPQ"),
  authDomain: getValidValue(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, "amsterdammeeting-b137e.firebaseapp.com"),
  projectId: getValidValue(import.meta.env.VITE_FIREBASE_PROJECT_ID, "amsterdammeeting-b137e"),
  storageBucket: getValidValue(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, "amsterdammeeting-b137e.firebasestorage.app"),
  messagingSenderId: getValidValue(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, "504967491532"),
  appId: getValidValue(import.meta.env.VITE_FIREBASE_APP_ID, "1:504967491532:web:43eb6e4c74063818e53769")
};

let app;
let auth;
let googleProvider;

try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } else {
    console.warn("Firebase configuration is missing. Skipping initialization.");
  }
} catch (error) {
  console.warn("Firebase configuration is invalid. Please check your environment variables.", error);
}

export const signInWithGoogle = async () => {
  if (!auth) throw new Error("Firebase not initialized");
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const logout = async () => {
  if (!auth) return;
  return signOut(auth);
};

export { auth };
