import React, { useEffect, useState } from "react";
import Room from "./ChatRoom/Room";
import { Col, Container } from "react-bootstrap";
import Loading from "../../components/Loading";
import ChatRoom from "./ChatRoom/ChatRoom";
import {
  allUsers,
  authUser,
  getAllAdminChat,
  getAllGroup,
} from "../../services/dotNet";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../../context";
import jwt from "jwt-decode";
import Toastify from "../../components/Toastify";
import { io } from "socket.io-client";

const LayoutChatRoom = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("tk");
  const navigate = useNavigate();
  const socket = io(import.meta.env.VITE_NODE_IP);
  const { setUserInfo, showToast, userInfo, setRoomId, setAllAdminChat } =
    useMyContext();

  const [showLoading, setShowLoading] = useState(false);
  const [allMemberGroup, setAllMemberGroup] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [isEditRoom, setIsEditRoom] = useState(false);
  const [allRoom, setAllRoom] = useState([]);

  const handleGetGroup = (data) => {
    setAllRoom((prev) => ({ ...prev, data }));
  };

  const handleGetAllGroup = async (userId) => {
    try {
      // socket.on("recieve_group", handleGetGroup);
      setShowLoading(true);
      console.log(userInfo);
      const res = await getAllGroup(userId || userInfo?.userId);
      const { data, code } = res.data;
      setAllRoom(data);
      setShowLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("recieve_group", handleGetGroup);
    return () => {
      socket.off("recieve_group", handleGetGroup);
    };
  }, [socket]);

  const handleGetToken = async () => {
    try {
      sessionStorage?.setItem("token", token);
      const userLogin = jwt(token);
      const username =
        userLogin["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const userId =
        userLogin[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      const userRole =
        userLogin[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      setUserInfo({
        username,
        userId,
        userRole,
      });
      handleGetAllGroup(userId);
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const handleRoomClick = (newRoomId) => {
    setGroupName(newRoomId?.room?.groupName);
    setRoomId(newRoomId?.room?.groupId || 0);
    navigate(
      `/?rmId=${newRoomId?.room?.groupId || 0}&tk=${sessionStorage?.getItem(
        "token"
      )}`
    );
  };

  const handleAllUsers = async () => {
    try {
      setShowLoading(true);
      const res = await allUsers();
      setShowLoading(false);
      const { data, status } = res;
      if (status == "Success") {
        setAllMemberGroup(data);
      }
      const resAdminChat = await getAllAdminChat();
      if (resAdminChat?.code === 0) {
        setAllAdminChat(resAdminChat?.data);
      }
    } catch (error) {
      console.log(error);
      setShowLoading(false);
    }
  };

  useEffect(() => {
    handleGetToken();
  }, []);

  useEffect(() => {
    handleGetAllGroup();
    handleAllUsers();
  }, [userInfo?.userId]);

  const handleProfile = () => {};

  return (
    <>
      {showLoading && <Loading />}
      <div className="">
        <p className="col-12 bg_rooms font15 fw-bold bg-white d-flex justify-content-between border-bottom border-1 px-3 py-3">
          <span className="text-white"> {groupName || "گروه عمومی"} </span>
          <span>
            <i
              onClick={handleProfile}
              className=" cursorPointer font20 bi bi-gear"
            />
          </span>
        </p>
        <div className="d-flex row mx-1 pb-3">
          <ChatRoom
            userInfo={userInfo}
            showLoading={showLoading}
            setShowLoading={setShowLoading}
            allMemberGroup={allMemberGroup}
            setAllMemberGroup={setAllMemberGroup}
            socket={socket}
          />
          <Room
            handleGetAllGroup={handleGetAllGroup}
            allRoom={allRoom}
            setAllRoom={setAllRoom}
            isEditRoom={isEditRoom}
            setIsEditRoom={setIsEditRoom}
            socket={socket}
            allMemberGroup={allMemberGroup}
            showLoading={showLoading}
            handleRoomClick={handleRoomClick}
            setShowLoading={setShowLoading}
          />
        </div>
      </div>
      {showToast?.show && <Toastify />}
    </>
  );
};

export default LayoutChatRoom;
