// Import firebase realtime database functions
import { ref, set, onValue } from "firebase/database";
// Connections
import { real_db } from "@/firebase/firebase.config";

// NOT IN USE: To fetch sensor data from a collection in Firebase Realtime Database using the onValue method
export const getRealTimeSensorData = (callback) => {
  let data;
  const dataPath = ref(real_db, "sensor-data"); // Replace 'sensor-data' with your database path
  onValue(dataPath, (snapshot) => {
    data = snapshot.val();
  });
  data.liveStatus = getTurnOnOff();
  return data;
};

// NOT IN USE: To fetch power switch state
export const getTurnOnOff = () => {
  let data;
  const dataPath = ref(real_db, "power-switch");
  onValue(dataPath, (snapshot) => {
    data = snapshot.val();
  });
  return data.liveStatus;
};

// To write data in Firebase Realtime Database using set method
export const setTurnOnOff = (switchState) => {
  set(ref(real_db, "power-switch"), {
    liveStatus: switchState,
  });
};
