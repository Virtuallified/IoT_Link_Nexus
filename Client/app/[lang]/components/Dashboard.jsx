import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client"; // Import socket.io-client
import { getRealTimeSensorData, setTurnOnOff } from "../api/realtime/route";
import { SomethingWentWrongError } from "../libs/Exceptions";
import { Card, CardBody, Chip, Switch } from "@nextui-org/react";
import { CheckIcon } from "../components/reusable/CheckIcon";
// Import firebase realtime database functions
import { ref, set, onValue } from "firebase/database";
// Connections
import { real_db } from "@/firebase/firebase.config";
import { CrossIcon } from "./reusable/CrossIcon";

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
      <div
        className="absolute inset-x-0 -top-1/2 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
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
