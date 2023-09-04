// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAapCGGAxMqKVady6uxwSkCz3NCC9aZZKA",
  authDomain: "iot-link-nexus.firebaseapp.com",
  databaseURL:
    "https://iot-link-nexus-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-link-nexus",
  storageBucket: "iot-link-nexus.appspot.com",
  messagingSenderId: "234480079084",
  appId: "1:234480079084:web:206a47b30d99412f3d15c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fire_db = getFirestore(app); // Firestore DB
export const real_db = getDatabase(app); // Realtime DB
