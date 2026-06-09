import axios from "axios";
import BASE_URL from "./api";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("secureme_token")}`,
  },
});

export const getAllReports = async () => {
  const response = await axios.get(
    `${BASE_URL}/reports`,
    authConfig()
  );

  return response.data;
};

export const updateReportStatus = async (id, status) => {
  const response = await axios.patch(
    `${BASE_URL}/reports/${id}/status`,
    { status },
    authConfig()
  );

  return response.data;
};