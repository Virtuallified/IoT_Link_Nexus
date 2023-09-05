import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Container, Flex, Switch, Text, Button } from "@radix-ui/themes";
import { getRealTimeSensorData, setTurnOnOff } from "../api/realtime/route";
import { useAuthState } from "@/app/utils/authUtils";

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
  const { signOut } = useAuthState();
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
    <div>
      <h2>Dashboard</h2>
      <div id="dashboard">
        {data && (
          <Container key={data.device_id}>
            <Flex>
              <Card>
                <Text>Humidity: {data.humidity}</Text>
                <Text>Temperature: {data.temperature}</Text>
                <p>Live Status: {data.liveStatus}</p>
                <Switch
                  checked={switchState}
                  onClick={() =>
                    handleLiveStatusToggle(data.device_id, data.liveStatus)
                  }></Switch>
              </Card>
            </Flex>
          </Container>
        )}
      </div>
      <Button onClick={signOut}>Logout</Button>
    </div>
  );
};

export default Dashboard;
