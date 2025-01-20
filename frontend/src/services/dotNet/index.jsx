import axios from "axios";
const minooAPI = import.meta.env.VITE_MINOOMART;
const pepTest = import.meta.env.VITE_PEPTEST;
const nodeIp = import.meta.env.VITE_NODE_IP;
// const minooAPI = "http://172.16.1.40:9888";
// const pepTest = "http://172.16.1.40:9888";
// const nodeIp = "http://172.16.1.40:9888";

export const allUsers = async () => {
  const response = await axios.get(`${minooAPI}/api/User/userList`);
  return response?.data;
};

export const getAllAdminChat = async () => {
  const response = await axios.get(`${nodeIp}/api/login/getAllAdminChat`);
  return response?.data;
};

export const authUser = async (postData) => {
  const response = await axios.post(`${minooAPI}/api/User/authUser`, postData);
  console.log(response);
  return response;
};

export const getMessages = async (roomId, role) => {
  const response = await axios.get(
    `${nodeIp}/api/chatRoom/getAllMessage/${roomId}/${role}`
  );
  return response;
};

export const getMessageQuery = async (userId, roomId) => {
  const response = await axios.get(
    `${nodeIp}/api/chatRoom/getMessage?userId=${userId}&roomId=${roomId}`
  );
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
  const response = await axios.get(
    `${nodeIp}/api/group/getAllGroup?userId=${userId}`
  );
  return response;
};

// export const attachFile = async (formData) => {
//   const response = await axios.post(
//     `${nodeIp}/api/chatRoom/uploader`,
//     formData,
//     { headers: { "Content-Type": "multipart/form-data" } }
//   );
//   return response;
// };

export async function UploadFiles(postData) {
  const url = `${nodeIp}/api/chatRoom/uploader`;
  const response = await fetch(url, {
    method: "POST",
    body: postData,
    headers: {
      Authorization: `Bearer ${sessionStorage?.getItem("token")}`,
    },
  });
  const result = await response.json();
  console.log("result", result);
  if (result.status == "Success") {
    console.log("New Ticket Insert" + JSON.stringify(result.data));
    return result.data;
  }
  return null;
}
