// Import firebase realtime database functions
import { ref, onValue } from "firebase/database";
// Connections
import { real_db } from "@/firebase/firebase.config";

// To fetch sensor data from a collection in Firebase Realtime Database using the onSnapshot method
export const getRealTimeSensorData = () => {
  let data;
  const dataPath = ref(real_db, "sensor-data"); // Replace 'sensor-data' with your database path
  onValue(dataPath, (snapshot) => {
    data = snapshot.val();
  });
  return data;
};
