import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Container,
  Flex,
  Switch,
  Text,
  Button,
  Box,
  Inset,
} from "@radix-ui/themes";
import { DashboardIcon } from "@radix-ui/react-icons";
import { getRealTimeSensorData, setTurnOnOff } from "../api/realtime/route";

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

  useEffect(() => {
    fetchData();
  }, [switchState]);

  const fetchData = () => {
    try {
      const sensorData = getRealTimeSensorData();
      setData(sensorData);
      setSwitchState(sensorData.liveStatus);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLiveStatusToggle = (id, currentStatus) => {
    try {
      currentStatus
        ? setTurnOnOff(false) && setSwitchState(false)
        : setTurnOnOff(true) && setSwitchState(true);
      fetchData();
    } catch (error) {
      console.error("Error updating live status:", error);
    }
  };

  return (
    <>
      <Box
        style={{
          background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}>
        <br />
        <Container id="dashboard" size="3">
          <Card size="3">
            <Flex>
              <Inset side="left" mr="5">
                <Flex
                  align="center"
                  justify="center"
                  px="7"
                  style={{ background: "#24292F", height: "100%" }}>
                  <DashboardIcon color="white" height="40" width="40" />
                </Flex>
              </Inset>
              <Box>
                <Text as="div" color="gray" mb="1" size="2">
                  <h2>Dashboard</h2>
                </Text>
                <Text>
                  {data && (
                    <Flex gap="3" key={data.device_id}>
                      <Card size="3" style={{ width: 200 }}>
                        <p>Humidity: {data.humidity}</p>
                        <p>Temperature: {data.temperature}</p>
                      </Card>
                      <Card style={{ width: 200 }}>
                        <p>Device ID: {data.device_id}</p>
                        <p>Device Name: {data.device_name}</p>
                        <p>Live Status: {data.liveStatus ? "On" : "Off"}</p>
                      </Card>
                      <Card
                        size="3"
                        style={{ width: 200, textAlign: "center" }}>
                        <p>Turn On/Off:</p>
                        <Switch
                          checked={switchState}
                          onClick={() =>
                            handleLiveStatusToggle(
                              data.device_id,
                              data.liveStatus
                            )
                          }></Switch>
                      </Card>
                    </Flex>
                  )}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Container>
        <br />
      </Box>
    </>
  );
};

export default Dashboard;
