import React, { useEffect, useState } from "react";
import ChatRoom from "../ChatRoom";
import { Col, Container, Row } from "react-bootstrap";
import ChatMessage from "../ChatRoom/Chat/ChatMessage";
import axios from "axios";
import { io } from "socket.io-client";
import { useOnlineUsers } from "../../context";

const index = () => {
  const { onlineUsers, setOnlineUsers } = useOnlineUsers();
  const [allGp, setAllGp] = useState([]);
  const [roomItem, setRoomItem] = useState("");

  console.log(onlineUsers);

  const getUserId = sessionStorage.getItem("userId");
  const socket = io("http://localhost:4004");

  const handleGetAllGroups = async () => {
    const res = await axios.get(`http://localhost:4004/api/chatRoom`);
    console.log(res);
    if (res.data.code === 0) {
      setAllGp(res.data.data);
    }
  };

  useEffect(() => {
    handleGetAllGroups();
    socket.emit("join_home", getUserId);
    socket.on("update_online_users", (data) => {
      setOnlineUsers(data);
    });

    return () => {
      socket.off("update_online_users");
      socket.disconnect();
    };
  }, [setOnlineUsers]);

  return (
    <div className="d-flex justify-content-end">
      {onlineUsers.map((user, index) => (
        <li key={index}>{user}</li>
      ))}
      <Col className="" xl="4">
        <ChatRoom setRoomItem={setRoomItem} allGp={allGp} />
      </Col>
    </div>
  );
};

export default index;
