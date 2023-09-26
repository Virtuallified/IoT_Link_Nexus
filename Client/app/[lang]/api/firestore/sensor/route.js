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

export const getSensorChartData = async () => {
  try {
    const sensorDataRef = collection(fire_db, "sensor-data");
    const snapshot = await getDocs(sensorDataRef);
    const data = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        _id: docData._id,
        humidity: docData.humidity,
        temperature: docData.temperature,
        updatedAt: formatMonth(docData.updatedAt),
      };
    });

    // Initialize structuredData object
    const structuredData = {
      humidity: [],
      temperature: [],
      updatedAt: [],
    };

    // Populate structuredData from data
    data.forEach((item) => {
      structuredData.humidity.push(item.humidity);
      structuredData.temperature.push(item.temperature);
      structuredData.updatedAt.push(item.updatedAt);
    });

    // Get a list of unique months from updatedAt
    const uniqueMonths = [...new Set(structuredData.updatedAt)];

    // Calculate average values in an Object for each unique month
    // const avgStructuredData = uniqueMonths
    //   .map((month) => calculateAverageByMonth(structuredData, month))
    //   .filter((averageData) => averageData !== null)
    //   .sort((a, b) => a.order - b.order); // Sort by the stored order of months

    // Initialize avgStructuredData as an empty object
    const avgStructuredData = {};

    // Calculate average values in an Array for each unique month
    uniqueMonths
      .sort(
        (a, b) =>
          new Date(Date.parse(`01 ${a} 2000`)) -
          new Date(Date.parse(`01 ${b} 2000`))
      ) // Sort months
      .forEach((month) => {
        const averageData = calculateAverageByMonth(structuredData, month);
        if (averageData !== null) {
          avgStructuredData.avgHumidity = avgStructuredData.avgHumidity || [];
          avgStructuredData.avgTemperature =
            avgStructuredData.avgTemperature || [];
          avgStructuredData.month = avgStructuredData.month || [];
          avgStructuredData.avgHumidity.push(averageData.avgHumidity);
          avgStructuredData.avgTemperature.push(averageData.avgTemperature);
          avgStructuredData.month.push(month);
        }
      });

    return avgStructuredData;
  } catch (error) {
    throw error;
  }
};

// Function to format a date to display only the month
const formatMonth = (dateString) => {
  const options = { month: "short" }; //Use 'long' for full month name
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Function to calculate average values for specific month from humidity and temperature arrays
const calculateAverageByMonth = (data, month) => {
  // Define the order of months
  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const humidityValues = data.humidity.map((value, index) =>
    data.updatedAt[index] === month ? value : null
  );
  const temperatureValues = data.temperature.map((value, index) =>
    data.updatedAt[index] === month ? value : null
  );

  // Filter out null values
  const filteredHumidity = humidityValues.filter((value) => value !== null);
  const filteredTemperature = temperatureValues.filter(
    (value) => value !== null
  );

  if (filteredHumidity.length === 0 || filteredTemperature.length === 0) {
    return null; // Return null if no data for the specified month
  }

  const avgHumidity = Math.ceil(
    filteredHumidity.reduce((acc, value) => acc + value, 0) /
      filteredHumidity.length
  );
  const avgTemperature = Math.ceil(
    filteredTemperature.reduce((acc, value) => acc + value, 0) /
      filteredTemperature.length
  );

  return {
    month,
    avgHumidity,
    avgTemperature,
  };
};
