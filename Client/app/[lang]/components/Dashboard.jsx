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
import { BarChart } from "./dashboard/BarChart";
import { LineChart } from "./dashboard/LineChart";
import { Gauge } from "./dashboard/Gauge";

const Dashboard = () => {
  // Initial state should be null or an empty object
  const initialState = {
    _id: null,
    device_id: null,
    device_name: "",
    ip_address: null,
    mac_address: null,
    firmware_version: null,
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

  // useEffect(() => {
  //   !_.isEqual(data, oldData) && createSensorData(data).then(setOldData(data));
  // }, [data]);

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
        <div id="dashboard" className="py-6" key={data._id}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Column 1 */}
              <div className="flex flex-col justify-between">
                <Card>
                  <CardBody>
                    <div className="flex space-x-1">
                      <svg
                        width="2rem"
                        height="2rem"
                        viewBox="0 0 1024 1024"
                        class="icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M339.7 882.5C196.6 882.5 80.2 766.1 80.2 623c0-133.2 204.8-395.1 228.2-424.5 5.8-7.3 14.5-11.6 23.8-11.7 9.4-0.1 18.1 3.9 24.1 11 1.5 1.8 37.7 44.8 82.2 105.2 10.1 13.8 7.2 33.2-6.6 43.3-13.8 10.1-33.2 7.2-43.3-6.6-21.3-29-40.9-54-55.3-72.1-69.2 92-191.2 271.5-191.2 355.4 0 108.9 88.6 197.6 197.6 197.6S537.3 731.9 537.3 623c0-17.1 13.9-31 31-31s31 13.9 31 31c-0.1 143.1-116.5 259.5-259.6 259.5z"
                          fill="#1A1A1A"
                        />
                        <path
                          d="M363.7 468.8c-27.9 59.7-46.8 115.7-46.8 158.4 0 164.6 133.4 298 298 298s298-133.4 298-298c0-12.8-1.9-26.9-5.5-41.9-327.2 33.9-284.9-194.9-543.7-116.5z"
                          fill="#00B36A"
                        />
                        <path
                          d="M333.6 567.6c-38.2 239.9 123 357.7 287.3 357.7 92.8 0 144.9-12.1 199.6-78.6-261.5 20.7-428.7-99.2-486.9-279.1z"
                          fill="#009957"
                        />
                        <path
                          d="M614.9 956.1C433.5 956.1 286 808.5 286 627.2c0-173.4 283.4-532.4 295.5-547.6 5.8-7.3 14.5-11.6 23.8-11.7 9.3-0.1 18.1 3.9 24.1 11 2 2.3 49 58.2 106.8 136.6 10.1 13.8 7.2 33.2-6.6 43.3-13.8 10.1-33.2 7.2-43.3-6.6-31.8-43.2-60.6-79.8-79.9-103.7C517 266.1 347.9 512.3 347.9 627.2c0 147.2 119.8 267 267 267s267-119.8 267-267c0-29.7-13.2-87.9-76.4-196.2-8.6-14.8-3.6-33.7 11.2-42.3 14.8-8.6 33.7-3.6 42.3 11.2 57.1 97.9 84.8 172.2 84.8 227.4 0 181.3-147.6 328.8-328.9 328.8z"
                          fill="#1A1A1A"
                        />
                      </svg>
                      Humidity:{" "}
                      <span className="font-semibold">{data.humidity}</span>
                    </div>
                    <div className="flex space-x-1">
                      <svg
                        width="2rem"
                        height="2rem"
                        viewBox="0 0 1024 1024"
                        class="icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M691.6 231.4H655c-10.9 0-19.8-8.9-19.8-19.8s8.9-19.8 19.8-19.8h36.6c10.9 0 19.8 8.9 19.8 19.8s-8.9 19.8-19.8 19.8zM691.6 305.7H655c-10.9 0-19.8-8.9-19.8-19.8s8.9-19.8 19.8-19.8h36.6c10.9 0 19.8 8.9 19.8 19.8s-8.9 19.8-19.8 19.8zM691.6 380H655c-10.9 0-19.8-8.9-19.8-19.8s8.9-19.8 19.8-19.8h36.6c10.9 0 19.8 8.9 19.8 19.8 0 10.8-8.9 19.8-19.8 19.8z"
                          fill="#1A1A1A"
                        />
                        <path
                          d="M603.3 589.7V159.5c0-51.9-42.2-94.1-94.1-94.1-51.9 0-94.1 42.2-94.1 94.1v430.2c-61 33.4-102.4 98.2-102.4 172.5 0 108.4 88.2 196.5 196.5 196.5s196.5-88.2 196.5-196.5c0-74.3-41.5-139.1-102.4-172.5z m-94.2 327.7c-85.6 0-155.3-69.7-155.3-155.3 0-50.3 24-95 61.2-123.4 12.4-9.5 26.3-17.2 41.2-22.6V159.5c0-29.2 23.7-52.9 52.9-52.9s52.9 23.7 52.9 52.9V616.1c14.9 5.4 28.8 13.1 41.2 22.6 37.1 28.4 61.2 73.1 61.2 123.4 0 85.7-69.6 155.3-155.3 155.3z"
                          fill="#1A1A1A"
                        />
                        <path
                          d="M509.4 766.5m-83.3 0a83.3 83.3 0 1 0 166.6 0 83.3 83.3 0 1 0-166.6 0Z"
                          fill="#00B36A"
                        />
                        <path
                          d="M613.3 767.2c-9.5-1.8-18.7 3.7-21.7 12.7-6.4 39.6-40.8 69.9-82.2 69.9-46 0-83.3-37.3-83.3-83.3s37.3-83.3 83.3-83.3c6.7 0 13.2 0.8 19.4 2.3 0.1-0.8 0.2-1.6 0.2-2.3V207.7c0-10.5-8.6-19-19-19-10.5 0-19 8.6-19 19v440.1c-0.9 0-1.9 0.1-2.8 0.3-49 9.1-86.8 46.6-96.3 95.5-12.7 65.2 30.1 128.6 95.3 141.2 7.7 1.5 15.4 2.2 23 2.2 56.5 0 107.1-40 118.2-97.5 1.9-10.3-4.8-20.3-15.1-22.3z"
                          fill="#1A1A1A"
                        />
                      </svg>
                      Temperature:{" "}
                      <span className="font-semibold">{data.temperature}</span>
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
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

              {/* Column 2 */}
              <div className="flex flex-col justify-between">
                <Card>
                  <CardBody>
                    <p>
                      Device ID:{" "}
                      <span className="font-semibold">{data.device_id}</span>
                    </p>
                    <p>
                      Device Name:{" "}
                      <span className="font-semibold">{data.device_name}</span>
                    </p>
                    <p>
                      IP Address:{" "}
                      <span className="font-semibold">{data.ip_address}</span>
                    </p>
                    <p>
                      MAC Address:{" "}
                      <span className="font-semibold">{data.mac_address}</span>
                    </p>
                    <p>
                      Firmware version:{" "}
                      <span className="font-semibold">
                        {data.firmware_version}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col justify-between">
                <Card>
                  <CardBody>
                    <div className="flex space-x-4">
                      <span>Turn On/Off:</span>
                      <div>
                        <Switch
                          isSelected={data.liveStatus}
                          onValueChange={() =>
                            handleLiveStatusToggle(
                              data.device_id,
                              data.liveStatus
                            )
                          }></Switch>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
      <div id="dashboard" className="py-6" key={data.device_id}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Column 1 */}
            <div className="flex flex-col justify-between">
              <Card>
                <BarChart />
              </Card>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col justify-between">
              <Card>
                <LineChart />
              </Card>
            </div>
            {/* Column 3 */}
            <div className="flex flex-col justify-between">
              <Card>
                <Gauge temperature={data.temperature} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
