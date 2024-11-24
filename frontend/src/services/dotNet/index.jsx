import axios from "axios";
const minooAPI = import.meta.env.VITE_MINOOMART;
const pepTest = import.meta.env.VITE_PEPTEST;
const nodeAPI = import.meta.env.VITE_NODE;

export const allUsers = async () => {
  const url = await axios.get(`${pepTest}/api/User/userList`);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });
  return response?.data;
};

export const getTokenPep = async () => {
  const response = await axios.get(`${nodeAPI}/api/login/getTokenPep`);
  console.log(response);
  return response;
};
