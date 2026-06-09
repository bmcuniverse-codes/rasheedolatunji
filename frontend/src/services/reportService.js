import axios from "axios";
import BASE_URL from "./api";

const getToken = () => localStorage.getItem("secureme_token");

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const createReport = async (reportData) => {
  const response = await axios.post(
    `${BASE_URL}/reports`,
    reportData,
    authHeader()
  );

  return response.data;
};

export const sendSOSAlert = async (location) => {
  const response = await axios.post(
    `${BASE_URL}/reports/sos`,
    { location },
    authHeader()
  );

  return response.data;
};

export const getMyReports = async () => {
  const response = await axios.get(
    `${BASE_URL}/reports/my-reports`,
    authHeader()
  );

  return response.data;
};

export const getAllReports = async () => {
  const response = await axios.get(`${BASE_URL}/reports`, authHeader());

  return response.data;
};

export const updateStatus = async (id, status) => {
  const response = await axios.patch(
    `${BASE_URL}/reports/${id}/status`,
    { status },
    authHeader()
  );

  return response.data;
};