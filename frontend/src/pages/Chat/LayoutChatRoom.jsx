import React, { useEffect, useState } from "react";
import Room from "./ChatRoom/Room";
import { Col, Container } from "react-bootstrap";
import Loading from "../../components/Loading";
import ChatRoom from "./ChatRoom/ChatRoom";
import { allUsers, authUser } from "../../services/dotNet";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../../context";
import jwt from "jwt-decode";

const LayoutChatRoom = () => {
  const query = new URLSearchParams(useLocation().search);
  const username = query.get("username");
  const password = query.get("password");
  const userId = query.get("userId");
  const roomId = query.get("roomId");
  const navigate = useNavigate();
  const { setUserInfo, setUserRole } = useMyContext();

  const [showLoading, setShowLoading] = useState(false);
  const [allMemberGroup, setAllMemberGroup] = useState([]);
  const [getUserId, setGetUserId] = useState("");

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
      const getRole =
        roleId["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setUserRole(getRole);
      const { status, data: userData } = res.data;

      if (status === "Success") {
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("token", userData?.token);
        sessionStorage.setItem("userName", username);
        sessionStorage.setItem("roomId", roomId);
        setGetUserId(userId);
        handleAllUsers();
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const handleRoomClick = (newRoomId) => {
    sessionStorage.setItem("roomId", newRoomId.id);
    navigate(
      `/?username=${username}&password=${password}&userId=${userId}&roomId=${newRoomId.id}`
    );
  };

  const handleAllUsers = async () => {
    try {
      setShowLoading(true);
      const res = await allUsers();
      console.log(res);
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

  return (
    <div className="">
      {showLoading && <Loading />}
      <p className="col-12 font15 rounded-1 fw-bold bg-white border-bottom border-3 mt-3 px-3 py-2">
        گروه عمومی
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
        />
        <Room
          allMemberGroup={allMemberGroup}
          showLoading={showLoading}
          handleRoomClick={handleRoomClick}
          setShowLoading={setShowLoading}
        />
      </div>
    </div>
  );
};

export default LayoutChatRoom;
