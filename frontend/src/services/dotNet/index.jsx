import axios from "axios";
const minooAPI = import.meta.env.VITE_MINOOMART;
const pepTest = import.meta.env.VITE_PEPTEST;
const nodeIp = import.meta.env.VITE_NODE_IP;

export const allUsers = async () => {
  const response = await axios.get(`${minooAPI}/api/User/userList`);
  return response?.data;
};

export const authUser = async (postData) => {
  const response = await axios.post(`${minooAPI}/api/User/authUser`, postData);
  console.log(response);
  return response;
};

export const getMessages = async () => {
  const response = await axios.get(`${nodeIp}/api/chatRoom/getAllMessage`);
  return response;
};

export const postGroup = async (postData) => {
  const response = await axios.post(
    `${nodeIp}/api/group/postGroupMentions`,
    postData
  );
  return response;
};

export const getAllGroup = async (userId) => {
  const response = await axios.get(`${nodeIp}/api/group/getAllGroup/${userId}`);
  return response;
};
