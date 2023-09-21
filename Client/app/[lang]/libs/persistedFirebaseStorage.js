import { doc, getDoc, setDoc } from "firebase/firestore";
import { fire_db } from "@/firebase/firebase.config"; // Import your Firebase configuration

export default {
  getItem: async (key) => {
    const docRef = doc(fire_db, "reduxData", key);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.data();
  },
  setItem: async (key, value) => {
    const docRef = doc(fire_db, "reduxData", key);
    await setDoc(docRef, value);
  },
  removeItem: async (key) => {
    // Implement removal logic in Firebase
  },
  // Implement other methods as needed
};
