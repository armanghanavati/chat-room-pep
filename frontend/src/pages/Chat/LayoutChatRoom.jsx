import React, { useEffect, useState } from "react";
import Room from "./ChatRoom/Room";
import { Col, Container } from "react-bootstrap";
import Loading from "../../components/Loading";
import ChatRoom from "./ChatRoom/ChatRoom";
import { allUsers, authUser, getAllGroup } from "../../services/dotNet";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../../context";
import jwt from "jwt-decode";
import Toastify from "../../components/Toastify";
import { io } from "socket.io-client";

const LayoutChatRoom = () => {
  const query = new URLSearchParams(useLocation().search);
  const username = query.get("username");
  const password = query.get("password");
  const userId = query.get("userId");
  const navigate = useNavigate();
  const socket = io(import.meta.env.VITE_NODE_IP);
  const { setUserInfo, setUserRole, showToast, setRoomId } = useMyContext();

  const [showLoading, setShowLoading] = useState(false);
  const [allMemberGroup, setAllMemberGroup] = useState([]);
  const [getUserId, setGetUserId] = useState("");
  const [isEditRoom, setIsEditRoom] = useState(false);
  const [allRoom, setAllRoom] = useState([]);

  const handleGetGroup = (data) => {
    setAllRoom((prev) => ({ ...prev, data }));
  };

  const handleGetAllGroup = async () => {
    try {
      socket.on("recieve_group", handleGetGroup);
      setShowLoading(true);
      const res = await getAllGroup(userId);
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

  useEffect(() => {
    handleGetAllGroup();
  }, []);

  const handleGetToken = async () => {
    const postData = {
      username,
      password,
    };
    try {
      setShowLoading(true);
      const res = await authUser(postData);
      setShowLoading(false);
      const roleId = jwt(res?.data?.data?.token);
      console.log(roleId);
      
      const getRole =
        roleId["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setUserRole(getRole);
      const { status, data: userData } = res.data;
      console.log(res);

      if (status === "Success") {
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("token", userData?.token);
        sessionStorage.setItem("userName", username);
        setGetUserId(userId);
        handleAllUsers();
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const handleRoomClick = (newRoomId) => {
    setRoomId(newRoomId?.room?.groupId || 0);
    navigate(
      `/?username=${username}&password=${password}&userId=${userId}&roomId=${
        newRoomId?.room?.groupId || 0
      }`
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
    } catch (error) {
      console.log(error);
      setShowLoading(false);
    }
  };

  const handleGetUserInfo = () => {
    return setUserInfo({
      username: username,
      password: password,
      userId: userId,
    });
  };

  useEffect(() => {
    handleGetToken();
    handleGetUserInfo();
  }, []);

  const handleProfile = () => {};

  return (
    <>
      <div className="">
        {showLoading && <Loading />}
        <p className="col-12 bg_rooms font15 fw-bold bg-white d-flex justify-content-between border-bottom border-1 px-3 py-3">
          <span className="text-white">گروه عمومی</span>
          <span>
            <i
              onClick={handleProfile}
              className=" cursorPointer font20 bi bi-gear"
            />
          </span>
        </p>
        <div className="d-flex row mx-1 pb-3">
          <ChatRoom
            getUserId={getUserId}
            username={username}
            password={password}
            userId={userId}
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
