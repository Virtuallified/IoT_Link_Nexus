// Following firebase firestore functions. colloection, addDoc, where, query, deleteDoc, updateDoc, doc from firebase/firestore
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
// Connections
import { fire_db } from "@/firebase/firebase.config"; // Assuming you have set up the Firebase configuration

// Execute on a collection in Firebase Firestore Database using different methods
export const getSensorData = async () => {
  try {
    const sensorDataRef = collection(fire_db, "sensor-data");
    const snapshot = await getDocs(sensorDataRef);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    throw error;
  }
};

export const createSensorData = async (newData) => {
  try {
    const sensorDataRef = collection(fire_db, "sensor-data");
    await addDoc(sensorDataRef, newData);
  } catch (error) {
    throw error;
  }
};

export const updateSensorData = async (id, updatedData) => {
  try {
    const sensorDataRef = doc(fire_db, "sensor-data", id);
    await updateDoc(sensorDataRef, updatedData);
  } catch (error) {
    throw error;
  }
};

export const deleteSensorData = async (id) => {
  try {
    const sensorDataRef = doc(fire_db, "sensor-data", id);
    await deleteDoc(sensorDataRef);
  } catch (error) {
    throw error;
  }
};

export const patchSensorData = async (id, patchData) => {
  try {
    const sensorDataRef = doc(fire_db, "sensor-data", id);
    await updateDoc(sensorDataRef, patchData);
  } catch (error) {
    throw error;
  }
};

// Add other CRUD functions as needed for your specific use case
