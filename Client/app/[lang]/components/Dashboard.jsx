import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client"; // Import socket.io-client
import { setTurnOnOff } from "../api/realtime/route";
import { SomethingWentWrongError } from "../libs/Exceptions";
import { Card, CardBody, Chip, Switch } from "@nextui-org/react";
import { CheckIcon, CrossIcon } from "./reusable/IconsLib";
import { BlurTop } from "./reusable/BlurBack";
// Import firebase realtime database functions
import { ref, set, onValue } from "firebase/database";
// Connections
import { real_db } from "@/firebase/firebase.config";
import _ from "lodash";
import { createSensorData } from "../api/firestore/sensor/route";

const Dashboard = () => {
  // Initial state should be null or an empty object
  const initialState = {
    _id: null,
    device_id: null,
    device_name: "",
    ip_address: null,
    humidity: null,
    temperature: null,
    liveStatus: false,
    updatedAt: null,
  };

  const user = useSelector((state) => state.user);
  const [data, setData] = useState({ initialState });
  const [oldData, setOldData] = useState(data);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.WS_SERVER); // Get websocket server URL from .env
    setSocket(newSocket);

    // ! To make consistant connection to realtime database, needed to add 'onValue' inside useEffect
    // * Get latest sensors data and power switch on/off
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

  useEffect(() => {
    !_.isEqual(data, oldData) && createSensorData(data).then(setOldData(data));
  }, [data]);

  const handleLiveStatusToggle = (device_id, currentStatus) => {
    try {
      currentStatus ? setTurnOnOff(false) : setTurnOnOff(true);

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
      <BlurTop />
      {data && (
        <div id="dashboard" className="py-12" key={data.device_id}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Column 1 */}
              <div className="flex flex-col justify-between">
                <Card>
                  <CardBody>
                    <p>Humidity: {data.humidity}</p>
                    <p>Temperature: {data.temperature}</p>
                  </CardBody>
                </Card>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col justify-between">
                <Card>
                  <CardBody>
                    <p>Device ID: {data.device_id}</p>
                    <p>Device Name: {data.device_name}</p>
                    <p>
                      Live Status:{" "}
                      {data.liveStatus ? (
                        <Chip
                          startContent={<CheckIcon size={18} />}
                          variant="faded"
                          color="success">
                          Running
                        </Chip>
                      ) : (
                        <Chip
                          startContent={<CrossIcon size={18} />}
                          variant="faded"
                          color="danger">
                          Stopped
                        </Chip>
                      )}
                    </p>
                  </CardBody>
                </Card>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col justify-between">
                <Card>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
