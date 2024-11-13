import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Messages from "./Messages";
import { useContextApi } from "../../../context";

const ChatMessage = () => {
  const [title, setTitle] = useState("");
  const [messages, setMessages] = useState([]);
  const [permission, setPermission] = useState({});
  const { userInfo } = useContextApi();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // const [time, setTime] = useState(null);
  const { id } = useParams();
  let time = {};
  const userId = sessionStorage.getItem("userId");
  const messagesEndRef = useRef(null);
  const hiddenFileInput = useRef(null);
  const titleInputRef = useRef(null);
  const socket = io("http://localhost:4004");

  console.log(userInfo);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
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
    scrollToBottom();
    return () => {
      socket.off("receive_message", handleReceiveMessage);
      // socket.off("update_online_users");
    };
  }, [
    socket,
    id, // setOnlineUsers
  ]);

  const handleIconClick = () => {
    hiddenFileInput.current.click();
  };

  const handleSendMessage = () => {
    const date = Date().toString();
    const fixDate = date?.split(" ")[4];

    time = fixDate;
    if (!title) return;
    socket.emit("send_message", {
      title,
      userId,
      roomId: id,
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { title, userId, from: "me", time: fixDate },
    ]);
    setTitle("");
  };

  const handleFileSend = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(
          "http://localhost:4004/api/chatRoom/uploader",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
        setUploadedFiles((prevFiles) => [...prevFiles, file]);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const renderFilePreview = (file) => {
    const fileType = file.type.split("/")[0];

    if (fileType === "image") {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          style={{
            borderRadius: "25px",
            width: "100px",
            height: "100px",
            marginRight: "10px",
          }}
        />
      );
    } else if (file.type === "application/pdf") {
      return (
        <i
          className="bi bi-file-earmark-pdf"
          style={{ fontSize: "30px", marginRight: "10px" }}
          title={file.name}
        ></i>
      );
    } else if (
      fileType === "application" &&
      (file.name.endsWith(".xls") || file.name.endsWith(".xlsx"))
    ) {
      return (
        <i
          className="bi bi-file-earmark-spreadsheet"
          style={{ fontSize: "30px", marginRight: "10px" }}
          title={file.name}
        ></i>
      );
    }
    return null; // اگر نوع فایل مشخص نیست
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = () => {
    const perm = userInfo?.permissions;
    if (perm != null)
      for (let i = 0; i < perm.length; i++) {
        switch (perm[i].objectName) {
          case "chats.update":
            setPermission((prev) => ({ ...prev, update: true }));
            break;
          case "chats.insert":
            setPermission((prev) => ({ ...prev, insert: true }));
            break;
          case "chats.show":
            setPermission((prev) => ({ ...prev, show: true }));
            break;
          case "chats.delete":
            setPermission((prev) => ({ ...prev, delete: true }));
            break;
        }
      }
  };

  return (
    <div className="col-6 mb-4 mt-2 container-fluid">
      <Col className="h_messages mb-5">
        <div
          className="d-flex m-1 pb-5 justify-content-center p-1"
          style={{ flexDirection: "column", display: "flex" }}
        >
          <Messages messages={messages} messagesEndRef={messagesEndRef} />
          <div className="mt-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="file-preview">
                {renderFilePreview(file)}
                <span>{file.name}</span>
              </div>
            ))}
          </div>
          <form className="justify-content-center">
            <div className="countainer_fields bg-light w-50 py-3 border-top border-bottom">
              <Col xxl="12" className="d-flex gap-2">
                <i
                  className="rounded-4 cursorPointer text-primary font20 d-flex align-items-center m-2 bi bi-send"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                />
                <div className="mt-2">
                  <i
                    onClick={handleIconClick}
                    className="rounded-pill ps-2 d-flex align-items-center justify-content-center text-primary font20 bi bi-pin-angle cursorPointer"
                  />
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleFileSend}
                    style={{ display: "none" }}
                  />
                </div>
                <Form.Control
                  ref={titleInputRef}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </div>
          </form>
        </div>
      </Col>
    </div>
  );
};

export default ChatMessage;
