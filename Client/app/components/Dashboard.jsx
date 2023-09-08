import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client"; // Import socket.io-client
import { getRealTimeSensorData, setTurnOnOff } from "../api/realtime/route";
import { SomethingWentWrongError } from "../libs/Exceptions";
import { Card, CardBody, Switch } from "@nextui-org/react";

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
  const [switchState, setSwitchState] = useState(false);
  const [socket, setSocket] = useState(null);

  const fetchData = () => {
    try {
      const sensorData = getRealTimeSensorData();
      setData(sensorData);
      setSwitchState(sensorData.liveStatus);
    } catch (error) {
      console.error("Error fetching data:", error);
      // throw new SomethingWentWrongError(`Error fetching data: ${error}`); // Throw an error
    }
  };

  useEffect(() => {
    const newSocket = io(process.env.SOCKET_SERVER_URL); // Get socket server URL from .env
    setSocket(newSocket);
    fetchData();
    return () => {
      newSocket.disconnect(); // Clean up socket connection on unmount
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("liveStatusUpdate", (updatedData) => {
        // Update local data when live status changes from another client
        setData((prevData) =>
          prevData.map((item) =>
            item.device_id === updatedData.device_id
              ? { ...item, liveStatus: updatedData.liveStatus }
              : item
          )
        );
      });
    }
  }, [socket]);

  const handleLiveStatusToggle = (device_id, currentStatus) => {
    try {
      currentStatus
        ? setTurnOnOff(false) && setSwitchState(false)
        : setTurnOnOff(true) && setSwitchState(true);

      fetchData();
      // Emit the updated live status to the server
      socket.emit("updateLiveStatus", { device_id, liveStatus: currentStatus });
    } catch (error) {
      // console.error("Error updating live status:", error);
      throw new SomethingWentWrongError(`Error updating live status: ${error}`); // Throw an error
    }
  };

  return (
    <>
      {data && (
        <div
          class="container mx-auto py-10"
          id="dashboard"
          size="3"
          key={data.device_id}>
          <div class="flex flex-row">
            <div class="basis-1/2"></div>
            <div class="basis-1/2">
              <Card size="3" style={{ width: 200 }}>
                <CardBody>
                  <p>Humidity: {data.humidity}</p>
                  <p>Temperature: {data.temperature}</p>
                </CardBody>
              </Card>
            </div>
            <div class="basis-1/2">
              <Card style={{ width: 200 }}>
                <CardBody>
                  <p>Device ID: {data.device_id}</p>
                  <p>Device Name: {data.device_name}</p>
                  <p>Live Status: {data.liveStatus ? "On" : "Off"}</p>
                </CardBody>
              </Card>
            </div>
            <div class="basis-1/2">
              <Card size="3" style={{ width: 200, textAlign: "center" }}>
                <CardBody>
                  <p>Turn On/Off:</p>
                  <Switch
                    isSelected={switchState}
                    onValueChange={() =>
                      handleLiveStatusToggle(data.device_id, data.liveStatus)
                    }></Switch>
                </CardBody>
              </Card>
            </div>
            <div class="basis-1/2"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
