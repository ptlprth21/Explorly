
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "roamready-kyyht",
  "appId": "1:359190008214:web:7139092cf9b1f00a1f8db7",
  "storageBucket": "roamready-kyyht.firebasestorage.app",
  "apiKey": "AIzaSyCiLfrpRXJ1oQzYJP0_N5lcmYYPGX3ZtoU",
  "authDomain": "roamready-kyyht.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "359190008214"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);
export { app };
