import axios from "axios";

// * API file with various HTTP verbs (GET, POST, PUT, DELETE, PATCH) for managing collections in a various database

const API_BASE_URL = "YOUR_API_BASE_URL"; // Replace with your API base URL

export const getSensorData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sensor-data`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSensorData = async (newData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sensor-data`, newData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSensorData = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/sensor-data/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSensorData = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/sensor-data/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchSensorData = async (id, patchData) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/sensor-data/${id}`,
      patchData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add other CRUD functions as needed for your specific use case
