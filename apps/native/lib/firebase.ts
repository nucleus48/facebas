import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { MMKV } from "react-native-mmkv";

const firebaseConfig = {
  apiKey: "AIzaSyAalG8A68ZuWjVTWduGhR8ect3QMvaGdLM",
  authDomain: "face-bas.firebaseapp.com",
  projectId: "face-bas",
  storageBucket: "face-bas.firebasestorage.app",
  messagingSenderId: "42367652011",
  appId: "1:42367652011:web:9bfa355e6574df0b4da7ee",
  measurementId: "G-JLBX00TX5L",
};

const storage = new MMKV();
const ReactNativePersistence = getReactNativePersistence({
  setItem: async (key: string, value: string) => storage.set(key, value),
  getItem: async (key: string) => storage.getString(key) ?? null,
  removeItem: async (key: string) => storage.delete(key),
});

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: ReactNativePersistence,
});
