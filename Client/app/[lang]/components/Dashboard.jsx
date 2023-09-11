import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client"; // Import socket.io-client
import { getRealTimeSensorData, setTurnOnOff } from "../api/realtime/route";
import { SomethingWentWrongError } from "../libs/Exceptions";
import { Card, CardBody, Switch } from "@nextui-org/react";
// Import firebase realtime database functions
import { ref, set, onValue } from "firebase/database";
// Connections
import { real_db } from "@/firebase/firebase.config";

const Dashboard = () => {
  // Initial state should be null or an empty object
  const initialState = {
    device_id: null,
    device_name: "",
    humidity: null,
    temperature: null,
    liveStatus: false,
  };

  const user = useSelector((state) => state.user);
  const [data, setData] = useState({ initialState });
  const [socket, setSocket] = useState(null);

  // const fetchData = () => {
  //   try {
  //     const sensorData = getRealTimeSensorData();
  //     setData(sensorData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     // throw new SomethingWentWrongError(`Error fetching data: ${error}`); // Throw an error
  //   }
  // };

  useEffect(() => {
    const newSocket = io(process.env.WS_SERVER); // Get websocket server URL from .env
    setSocket(newSocket);

    // ! To make consistant connection to realtime database, needed to add 'onValue' inside useEffect
    // * Get latest sensors data  and
    onValue(ref(real_db, "sensor-data"), async (snapshot) => {
      try {
        if (snapshot.exists()) {
          let sensorData = await snapshot.val();
          onValue(ref(real_db, "power-switch"), (snapshot) => {
            if (snapshot.exists()) {
              let powerSwitch = snapshot.val();
              setData({
                ...sensorData,
                liveStatus: powerSwitch.liveStatus,
              });
            }
          });
        }
      } catch (error) {
        console.error("Data does not exist.", error);
      }
    });

    // onValue(ref(real_db, "power-switch"), (snapshot) => {
    //   if (snapshot.exists()) {
    //     let incomingData = snapshot.val();
    //     setData({ ...data, liveStatus: incomingData.liveStatus });
    //     console.log(data);
    //   } else {
    //     console.error("Data does not exist.");
    //   }
    // });

    return () => {
      newSocket.disconnect(); // Clean up socket connection on unmount
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("liveStatusUpdate", (updatedData) => {
        // Update local data when live status changes from another client
        setData((data) => {
          return data.device_id === updatedData.device_id
            ? { ...data, liveStatus: updatedData.liveStatus }
            : data;
        });
      });
    }
  }, [socket]);

  const handleLiveStatusToggle = (device_id, currentStatus) => {
    try {
      currentStatus ? setTurnOnOff(false) : setTurnOnOff(true);

      fetchData();
      // Emit the updated live status to the server
      socket.emit("updateLiveStatus", {
        device_id,
        liveStatus: !currentStatus,
      });
    } catch (error) {
      throw new SomethingWentWrongError(`Error updating live status: ${error}`); // Throw an error
    }
  };

  return (
    <>
      {data && (
        <div
          className="container mx-auto py-10"
          id="dashboard"
          size="3"
          key={data.device_id}>
          <div className="flex flex-row">
            <div className="basis-1/2"></div>
            <div className="basis-1/2">
              <Card size="3" style={{ width: 200 }}>
                <CardBody>
                  <p>Humidity: {data.humidity}</p>
                  <p>Temperature: {data.temperature}</p>
                </CardBody>
              </Card>
            </div>
            <div className="basis-1/2">
              <Card style={{ width: 200 }}>
                <CardBody>
                  <p>Device ID: {data.device_id}</p>
                  <p>Device Name: {data.device_name}</p>
                  <p>Live Status: {data.liveStatus ? "On" : "Off"}</p>
                </CardBody>
              </Card>
            </div>
            <div className="basis-1/2">
              <Card size="3" style={{ width: 200, textAlign: "center" }}>
                <CardBody>
                  <p>Turn On/Off:</p>
                  <Switch
                    isSelected={data.liveStatus}
                    onValueChange={() =>
                      handleLiveStatusToggle(data.device_id, data.liveStatus)
                    }></Switch>
                </CardBody>
              </Card>
            </div>
            <div className="basis-1/2"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
