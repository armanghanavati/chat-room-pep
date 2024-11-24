import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatRoom/Chat/ChatMessage";
import { io } from "socket.io-client";
import axios from "axios";
import Room from "./ChatRoom/Room";
import { Col, Container } from "react-bootstrap";
import { getTokenPep } from "../../services/dotNet";
import Loading from "../../components/Loading";

const Chat = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [permission, setPermission] = useState({});

  const getUserId = sessionStorage.getItem("UserId");
  const socket = io(import.meta.env.VITE_NODE);

  // const fetchChatHistory = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_NODE}/api/chatRoom/getMessage/${getUserId}`
  //     );
  //     setMessages(response?.data?.data);
  //   } catch (error) {
  //     console.error("Error fetching chat history:", error);
  //   }
  // };

  const handleGetToken = async () => {
    setShowLoading(true);
    console.log("start getToken");
    const resGetTokens = await getTokenPep();
    console.log("end getToken");

    setShowLoading(false);
    console.log(resGetTokens);
  };

  // useEffect(() => {
  //   if (getUserId) {
  //     socket.emit("join_home", getUserId);
  //   }
  //   // socket.on("update_online_users", (data) => {
  //   //   setOnlineUsers(data);
  //   // });

  //   return () => {
  //     socket.off("update_online_users");
  //     socket.disconnect();
  //   };
  // }, [getUserId, setOnlineUsers]);

  useEffect(() => {
    handleGetToken();
  }, []);

  return (
    <Container fluid className="">
      {showLoading && <Loading />}
      {/* <div className="d-flex mx-1 pb-3">
        <span className="font15 rounded-1 fw-bold border-bottom border-3 mt-3 px-3 py-2">
          گروه عمومی
        </span>
      </div>
      <div className="d-flex mx-3">
        <Col xxl="9">
          <ChatMessage messages={messages} setMessages={setMessages} />
        </Col>
        <Col xxl="3">
          <Room />
        </Col>
      </div> */}
    </Container>
  );
};

export default Chat;
