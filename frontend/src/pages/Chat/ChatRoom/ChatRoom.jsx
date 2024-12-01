import React, { useEffect, useState } from "react";
import ChatMessage from "./Chat/ChatMessage";
import { io } from "socket.io-client";
import Room from "./Room";
import { Col, Container } from "react-bootstrap";
import { allUsers, authUser, getMessages } from "../../../services/dotNet";
import Loading from "../../../components/Loading";
import jwt from "jwt-decode";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMyContext } from "../../../context";

const ChatRoom = ({
  showLoading,
  setShowLoading,
  allMemberGroup,
  setAllMemberGroup,
  username,
  password,
  getUserId,
}) => {
  const { setUserRole } = useMyContext();
  const socket = io(import.meta.env.VITE_NODE_IP);
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);

  // const validateCredentials = () => {
  //   if (username && password) {
  //     handleGetToken({ username, password });
  //     fetchChatHistory();
  //   } else {
  //     alert("اطلاعات ورودی نادرست است");
  //   }
  // };

  const fetchChatHistory = async () => {
    try {
      const res = await getMessages();
      setMessages(res?.data?.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
    if (getUserId) {
      socket.emit("join_home", getUserId);
    }
    return () => {
      socket.off("update_online_users");
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <>
      {showLoading && <Loading />}
      <div className="col-xxl-9 col-xs-12">
        <ChatMessage
          allMemberGroup={allMemberGroup}
          setAllMemberGroup={setAllMemberGroup}
          showLoading={showLoading}
          setShowLoading={setShowLoading}
          socket={socket}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </>
  );
};

export default ChatRoom;
