import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const ChatMessage = () => {
  const { id } = useParams();
  const getUserId = sessionStorage.getItem("userId");

  let time = "";
  const socket = io("http://localhost:4004");
  const [title, setTitle] = useState("");
  const [messages, setMessages] = useState([]);
  // const [time, setTime] = useState(null);
  const handleReceiveMessage = (data) => {
    console.log(data);

    setMessages((prev) => [
      ...prev,
      { title: data?.message, userId: data?.userId },
    ]);
  };

  useEffect(() => {
    // socket.emit("join_home", getUserId);
    socket.emit("join_room", id);
    socket.on("receive_message", handleReceiveMessage);
    // socket.on("update_online_users", (data) => {
    //   setOnlineUsers(data);
    // });
    return () => {
      socket.off("receive_message", handleReceiveMessage);
      // socket.off("update_online_users");
    };
  }, [
    socket,
    id,
    // setOnlineUsers
  ]);

  const handleSendMessage = () => {
    const date = Date().toString();
    const fixDate = date.split(" ")[4];
    time = fixDate;
    if (!title) return;
    socket.emit("send_message", {
      title,
      getUserId,
      roomId: id,
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { title, getUserId, from: "me" },
    ]);
    setTitle("");
  };

  return (
    <div className="m-2">
      گروه: {id}
      <div className="d-flex row justify-content-center p-4">
        {messages?.map((msg, index) => {
          return (
            <div
              key={index}
              className={`d-flex w-100 align-items-center justify-content-${
                msg.from === "me" ? "start" : "end"
              }`}
            >
              <div
                className="rounded-5 my-2 p-3"
                style={{
                  backgroundColor: msg.from === "me" ? "Lavender" : "lightblue",
                  maxWidth: "50%",
                  wordWrap: "break-word",
                }}
              >
                <div className="d-flex justify-content-between">
                  <span className="ms-2">{msg.title}</span>
                  <div className="text-secondary">
                    <span>username: {msg?.userId}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* {onlineUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))} */}
        <Row className="bg-warning">
          <form className="justify-content-center">
            <div className="countainer_chat bg-light w-50 pt-4 border-top">
              <Col xxl="12" className="d-flex gap-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  ارسال
                </Button>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </div>
          </form>
        </Row>
      </div>
    </div>
  );
};

export default ChatMessage;
