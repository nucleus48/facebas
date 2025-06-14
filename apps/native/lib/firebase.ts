import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseError, initializeApp } from "firebase/app";
import {
  AuthErrorCodes,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAalG8A68ZuWjVTWduGhR8ect3QMvaGdLM",
  authDomain: "face-bas.firebaseapp.com",
  projectId: "face-bas",
  storageBucket: "face-bas.firebasestorage.app",
  messagingSenderId: "42367652011",
  appId: "1:42367652011:web:815d64769703732a4da7ee",
  measurementId: "G-H8QXVP9XJQ",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export function handleFirebaseError(error: FirebaseError) {
  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return "Email already exists.";
    case AuthErrorCodes.INVALID_EMAIL:
      return "Invalid email address.";
    case AuthErrorCodes.WEAK_PASSWORD:
      return "Password is too weak.";
    case AuthErrorCodes.NETWORK_REQUEST_FAILED:
      return "Network error. Please try again.";
    case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
      return "Invalid email or password.";
    default:
      return "An error occurred. Please try again.";
  }
}
