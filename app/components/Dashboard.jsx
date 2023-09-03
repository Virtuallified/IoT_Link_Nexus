import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Container, Flex, Switch, Text, Button } from "@radix-ui/themes";
import {
  getSensorData,
  updateSensorData,
  deleteSensorData,
  patchSensorData,
} from "../api/firestore/route";
import { useAuthState } from "@/app/utils/authUtils";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const { signOut } = useAuthState();
  const [data, setData] = useState({
    humidity: 45,
    temperature: 23,
    liveStatus: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sensorData = await getSensorData();
        setData(sensorData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const handleLiveStatusToggle = async (id, currentStatus) => {
  //   try {
  //     const newStatus = currentStatus === "on" ? "off" : "on";
  //     await updateLiveStatus(id, newStatus);

  //     // Update the local data state
  //     setData((prevData) =>
  //       prevData.map((item) =>
  //         item.id === id ? { ...item, liveStatus: newStatus } : item
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating live status:", error);
  //   }
  // };

  return (
    <div>
      <h2>Dashboard</h2>
      <div id="dashboard">
        {
          data && (
            // data.map((item) => (
            <Container key={(data.id = "567")}>
              <Flex>
                <Card>
                  <Text>Humidity: {data.humidity}</Text>
                  <Text>Temperature: {data.temperature}</Text>
                  <p>Live Status: {data.liveStatus}</p>
                  <Switch
                    checked={data.liveStatus === "on"}
                    onChange={() =>
                      handleLiveStatusToggle((data.id = "567"), data.liveStatus)
                    }>
                    {data.liveStatus === "on" ? "Live On" : "Live Off"}
                  </Switch>
                </Card>
              </Flex>
            </Container>
          )
          // ))
        }
      </div>
      <Button onClick={() => signOut}>Logout</Button>
    </div>
  );
};

export default Dashboard;
