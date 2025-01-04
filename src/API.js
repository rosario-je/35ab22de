import axios from "axios";

const API_URL = "https://aircall-api.onrender.com"

// This API call is responsible for fetching the list of calls
export const getCallList = async () => {
  try {
    const response = await axios.get(`${API_URL}/activities`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// This API call is responsible for fetching the details of a specific call
export const getCallDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/activities/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// This API call is responsible for updating the call details
export const updateCall = async (id, data) => {
  try {
    const response = await axios.post(`${API_URL}/activities/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export const resetAllCallStatus = async () => {
  try {
    const response = await axios.post(`${API_URL}/reset`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}