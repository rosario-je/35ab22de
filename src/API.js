import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
})

const API_URL = process.env.REACT_APP_API_KEY

// This API call is responsible for fetching the list of calls
export const getCallList = async () => {
  try {
    const response = await axiosInstance.get('/activities');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// This API call is responsible for fetching the details of a specific call
export const getCallDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// This API call is responsible for updating the call details
export const updateCall = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/activities/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export const resetAllCallStatus = async () => {
  try {
    const response = await axiosInstance.patch('/reset');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}