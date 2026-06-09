import axios from "axios";
import BASE_URL from "./api";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("secureme_token")}`,
  },
});

export const getContacts = async () => {
  const response = await axios.get(
    `${BASE_URL}/contacts`,
    authConfig()
  );

  return response.data;
};

export const addContact = async (contactData) => {
  const response = await axios.post(
    `${BASE_URL}/contacts`,
    contactData,
    authConfig()
  );

  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/contacts/${id}`,
    authConfig()
  );

  return response.data;
};