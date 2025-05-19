import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAalG8A68ZuWjVTWduGhR8ect3QMvaGdLM",
  authDomain: "face-bas.firebaseapp.com",
  projectId: "face-bas",
  storageBucket: "face-bas.firebasestorage.app",
  messagingSenderId: "42367652011",
  appId: "1:42367652011:web:9bfa355e6574df0b4da7ee",
  measurementId: "G-JLBX00TX5L",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = initializeAuth(firebaseApp);
