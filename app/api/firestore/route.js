"use server";

// * Following firebase firestore functions. colloection, addDoc, where, query, deleteDoc, updateDoc, doc from firebase/firestore

import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  updateDoc,
  doc,
  ref,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebase.config"; // Assuming you have set up the Firebase configuration

// To fetch sensor data from a collection in Firebase Realtime Database using the onSnapshot method
export const getRealTimeSensorData = (callback) => {
  const sensorDataRef = ref(db, "sensor-data"); // Replace 'sensor-data' with your database path

  onSnapshot(sensorDataRef, (snapshot) => {
    const data = [];

    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const value = childSnapshot.val();
      data.push({ id: key, ...value });
    });

    callback(data);
  });
};

// Execute on a collection in Firebase Firestore Database using different methods
export const getSensorData = async () => {
  try {
    const sensorDataRef = collection(db, "sensor-data");
    const snapshot = await getDocs(sensorDataRef);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    throw error;
  }
};

export const createSensorData = async (newData) => {
  try {
    const sensorDataRef = collection(db, "sensor-data");
    await addDoc(sensorDataRef, newData);
  } catch (error) {
    throw error;
  }
};

export const updateSensorData = async (id, updatedData) => {
  try {
    const sensorDataRef = doc(db, "sensor-data", id);
    await updateDoc(sensorDataRef, updatedData);
  } catch (error) {
    throw error;
  }
};

export const deleteSensorData = async (id) => {
  try {
    const sensorDataRef = doc(db, "sensor-data", id);
    await deleteDoc(sensorDataRef);
  } catch (error) {
    throw error;
  }
};

export const patchSensorData = async (id, patchData) => {
  try {
    const sensorDataRef = doc(db, "sensor-data", id);
    await updateDoc(sensorDataRef, patchData);
  } catch (error) {
    throw error;
  }
};

// Add other CRUD functions as needed for your specific use case
