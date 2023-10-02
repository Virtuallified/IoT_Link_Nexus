import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getSensorChartData } from "../../api/firestore/sensor/route";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart() {
  const [avgData, setAvgData] = useState({});

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Humidity & Temperature graph representation",
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
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Temperature",
        data: avgData.avgTemperature,
        borderColor: "rgb(53, 162, 235)",
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
  return <Line options={options} data={data} />;
}
