import React, { useEffect, useState } from "react";
import ChatMessage from "./Chat/ChatMessage";
import { getMessageQuery } from "../../../services/dotNet";
import Loading from "../../../components/Loading";
import { useMyContext } from "../../../context";

const ChatRoom = ({
  showLoading,
  setShowLoading,
  allMemberGroup,
  setAllMemberGroup,
  socket,
  userInfo,
}) => {
  const { roomId } = useMyContext();
  const [messages, setMessages] = useState(null);

  const fetchChatHistory = async () => {
    try {
      console.log(userInfo?.userId, roomId);
      const res = await getMessageQuery(userInfo?.userId, roomId);
      console.log(res);
      setMessages(res?.data?.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
    if (userInfo?.userId) {
      socket.emit("join_home", userInfo?.userId);
    }

    return () => {
      socket.off("update_online_users");
      socket.disconnect();
    };
  }, [roomId, userInfo?.userId]);

  return (
    <>
      {showLoading && <Loading />}
      <div className="col-xxl-9 col-xs-12">
        {roomId !== null ? (
          <ChatMessage
            userInfo={userInfo}
            allMemberGroup={allMemberGroup}
            setAllMemberGroup={setAllMemberGroup}
            showLoading={showLoading}
            setShowLoading={setShowLoading}
            socket={socket}
            messages={messages}
            setMessages={setMessages}
          />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default ChatRoom;
