import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPuuyDITXTQ5JE0mbZJhnBte8YeGD6kP0",
  authDomain: "univoinfotech-25d66.firebaseapp.com",
  projectId: "univoinfotech-25d66",
  storageBucket: "univoinfotech-25d66.firebasestorage.app",
  messagingSenderId: "931724877254",
  appId: "1:931724877254:web:3b9014af07029a7b7c66c7",
  measurementId: "G-EXQ82M2GX0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics safely (check window context)
let analytics;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.warn("Firebase analytics init error:", e);
  }
}

// Initialize Firestore Database & Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

export { app, analytics };
export default app;
