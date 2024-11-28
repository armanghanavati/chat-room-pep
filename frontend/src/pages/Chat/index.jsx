import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatRoom/Chat/ChatMessage";
import { io } from "socket.io-client";
import Room from "./ChatRoom/Room";
import { Col, Container } from "react-bootstrap";
import { allUsers, authUser, getMessages } from "../../services/dotNet";
import Loading from "../../components/Loading";
import jwt from "jwt-decode";
import { useLocation } from "react-router-dom";
import { useContextApi } from "../../context";

const Chat = () => {
  const query = new URLSearchParams(useLocation().search);
  const username = query.get("username");
  const password = query.get("password");
  const userId = query.get("userId");
  const { setUserRole } = useContextApi();

  const socket = io(import.meta.env.VITE_NODE_IP);

  const [showLoading, setShowLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [allMemberGroup, setAllMemberGroup] = useState([]);
  const [getUserId, setGetUserId] = useState("");

  const validateCredentials = () => {
    // const secretKey = "abcdef";
    // const username = CryptoJS?.AES?.decrypt(userName, secretKey)?.toString(
    //   CryptoJS?.enc?.Utf8
    // );
    // console.log(username);

    // const password = CryptoJS?.AES?.decrypt(password, secretKey).toString(
    //   CryptoJS?.enc?.Utf8
    // );
    if (username && password) {
      handleGetToken({ username, password });
      fetchChatHistory();
    } else {
      alert("اطلاعات ورودی نادرست است");
    }
  };

  const fetchChatHistory = async () => {
    try {
      const res = await getMessages();
      setMessages(res?.data?.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleGetToken = async (data) => {
    const postData = {
      username: data?.username,
      password: data?.password,
    };
    try {
      setShowLoading(true);
      const res = await authUser(postData);
      console.log(res?.data?.data?.token);
      const roleId = jwt(res?.data?.data?.token);
      console.log("roleId", roleId);

      const getRole =
        roleId["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setUserRole(getRole);
      setShowLoading(false);
      const { status, data: userData } = res.data;
      if (status === "Success") {
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("token", userData?.token);
        sessionStorage.setItem("userName", username);
        setGetUserId(userId);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  useEffect(() => {
    if (getUserId) {
      socket.emit("join_home", getUserId);
    }

    return () => {
      socket.off("update_online_users");
      socket.disconnect();
    };
  }, [getUserId]);

  const handleAllGroups = async () => {
    try {
      setShowLoading(true);
      const res = await allUsers();
      setShowLoading(false);
      const { data, status } = res;
      console.log("allMemberGroup", res);

      if (status == "Success") {
        console.log(res);

        setAllMemberGroup(data);
      }
    } catch (error) {
      console.log(error);
      setShowLoading(false);
    }
  };

  useEffect(() => {
    if (username !== "" && password !== "") validateCredentials();
    handleAllGroups();
  }, []);

  const handleSetting = () => {
    
  };

  return (
    <Container fluid>
      {showLoading && <Loading />}
      <div className="d-flex mx-1 pb-3">
        <span className="font15 rounded-1 fw-bold bg-white border-bottom border-3 mt-3 px-3 py-2">
          گروه عمومی
        </span>
        <span
          onClick={handleSetting}
          className="font15 fw-bold mt-3 px-3 cursorPointer py-2"
        >
          تنظیمات
        </span>
      </div>
      <div className="d-flex row bg-white">
        <Col xs="12" xxl="9">
          <ChatMessage
            allMemberGroup={allMemberGroup}
            setAllMemberGroup={setAllMemberGroup}
            showLoading={showLoading}
            setShowLoading={setShowLoading}
            socket={socket}
            messages={messages}
            setMessages={setMessages}
          />
        </Col>
        <Col xxl="3">
          <Room
            allMemberGroup={allMemberGroup}
            showLoading={showLoading}
            setShowLoading={setShowLoading}
          />
        </Col>
      </div>
    </Container>
  );
};

export default Chat;
