// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
export { app };
