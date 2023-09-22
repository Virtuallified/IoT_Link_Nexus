// Following firebase firestore functions. colloection, addDoc, where, query, deleteDoc, updateDoc, doc from firebase/firestore
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  getCountFromServer,
  where,
  query,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";

// Connections
import { fire_db } from "@/firebase/firebase.config";
import { v4 as uuidv4 } from "uuid"; // Assuming you have set up the Firebase configuration

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
    await addDoc(sensorDataRef, {
      ...newData,
      _id: newData._id ? newData._id : uuidv4(),
    });
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

export const getActivityPaginate = async (page, startAfterDoc, pageSize) => {
  let results;

  try {
    // Total count
    const coll = collection(fire_db, "sensor-data");
    const fullSnapshot = await getCountFromServer(coll);
    const totalDocs = fullSnapshot.data().count;

    const baseQuery = query(
      collection(fire_db, "sensor-data"),
      orderBy("updatedAt"), // You can specify your orderBy here
      ...(startAfterDoc ? [startAfter(startAfterDoc)] : []), // Conditionally include startAfter
      limit(pageSize)
    );

    const snapshot = await getDocs(baseQuery);
    results = snapshot.docs.map((doc) => doc.data());

    // Construct the pagination object
    const pagination = {
      count: totalDocs,
      next:
        results.length === pageSize
          ? snapshot.docs[snapshot.docs.length - 1]
          : null,
      previous: page > 1 ? startAfterDoc : null,
      results,
    };

    return pagination;
  } catch (error) {
    console.error("An error occurred while fetching data.", error);
    throw error; // Rethrow the error for handling elsewhere
  }
};
