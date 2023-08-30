"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Dashboard = () => {
  // const user = useSelector((state) => state.user);
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
    <div>
      <h2>Dashboard</h2>
      {data && (
        <div>
          <p>Humidity: {data.humidity}</p>
          <p>Temperature: {data.temperature}</p>
          <p>Live Status: {data.liveStatus}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
