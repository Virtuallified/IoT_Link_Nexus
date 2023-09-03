"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container, Content, Toggle, Text, Button } from "@radix-ui/themes";
import { useAuthState } from "@/app/utils/authUtils"; // Import the useAuthState hook

const Dashboard = () => {
  // const user = useSelector((state) => state.user);
  const { signOut } = useAuthState();
  const [data, setData] = useState({
    humidity: 45,
    temperature: 23,
    liveStatus: true,
  });

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         // Make an API request using Axios to fetch data from Firebase
  //         const response = await axios.get('YOUR_FIREBASE_API_URL');
  //         setData(response.data);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  return (
    <>
      <h2>Dashboard</h2>
      {data && (
        <div id="dashboard">
          <p>Humidity: {data.humidity}</p>
          <p>Temperature: {data.temperature}</p>
          <p>Live Status: {data.liveStatus}</p>
        </div>
      )}
      <Button onClick={() => signOut}>Logout</Button>
    </>
  );
};

export default Dashboard;
