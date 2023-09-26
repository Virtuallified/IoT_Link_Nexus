import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getSensorChartData } from "../../api/firestore/sensor/route";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart() {
  const [avgData, setAvgData] = useState({});

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly average of Humidity & Temperature data",
      },
    },
  };

  const labels = avgData.month;

  const data = {
    labels,
    datasets: [
      {
        label: "Humidity",
        data: avgData.avgHumidity,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Temperature",
        data: avgData.avgTemperature,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const chartData = async () => {
    try {
      let data = await getSensorChartData();
      setAvgData(data);
    } catch (error) {
      console.error("Error while fetching user data:", error);
    }
  };

  useEffect(() => {
    chartData();
  }, []);

  return <Bar options={options} data={data} />;
}
