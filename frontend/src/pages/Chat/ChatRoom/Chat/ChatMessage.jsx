import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Messages from "./Messages";

import SelectMultiTable from "../../../../components/SelectMultiTable";
import Loading from "../../../../components/Loading";
import { useMyContext } from "../../../../context";
import { attachFile } from "../../../../services/dotNet";

const ChatMessage = ({ messages, setMessages, socket, allMemberGroup }) => {
  const { userRole, roomId } = useMyContext();
  const { id } = useParams();
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const messagesEndRef = useRef(null);
  const hiddenFileInput = useRef(null);
  const titleInputRef = useRef(null);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedUserMention, setSelectedUserMention] = useState([]);
  const [getUserMention, setGetUserMention] = useState([]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReceiveMessage = (data) => {
    const fixUserId = Number(userId);
    const fixServerUserId = Number(data?.userId);
    const mapRecieverIds =
      data?.recieverId !== null ? data?.recieverId?.map((ids) => ids) : [];
    const fixIncloudes = mapRecieverIds.some((item) => item === fixUserId);
    console.log(
      "data",
      data,
      "fixIncloudes ",
      mapRecieverIds,
      data?.recieverId?.length
    );

    if (roomId !== 0) {
      setMessages((prev) => [
        ...prev,
        {
          title: data?.message,
          userId: data?.userId,
          userName: data?.userName,
          time: data?.time,
          recieverId: data?.recieverId,
          roomId: data?.roomId,
        },
      ]);
    } else if (
      data.roomId === roomId &&
      (fixUserId === fixServerUserId ||
        fixIncloudes ||
        data?.recieverId?.length === 0)
    ) {
      setMessages((prev) => [
        ...prev,
        {
          title: data?.message,
          userId: data?.userId,
          userName: data?.userName,
          time: data?.time,
          recieverId: data?.recieverId,
          roomId: data?.roomId,
        },
      ]);
    }
  };

  useEffect(() => {
    socket.emit("join_room_id", roomId);
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

  const handleSendMessage = () => {
    const date = new Date().toString();
    const timeString = date.split(" ")[4];
    const fixForRole = userRole?.toString();
    // const findAdmin = fixForRole?.includes("chatAdmin");

    if (title) {
      if (roomId !== 0) {
        socket.emit("send_message", {
          title: title,
          recieverId: null,
          userName: userName,
          time: timeString,
          userId: userId,
          roomId: roomId,
        });
      } else {
        socket.emit("send_message", {
          title: title,
          recieverId: [sessionStorage.getItem("userId")],
          userName: userName,
          time: timeString,
          userId: userId,
          roomId: roomId,
        });
      }
    }
    setTitle("");
    titleInputRef?.current?.focus();
  };

  const handleFileSend = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        socket.emit("attach_file", {
          userId,
        });
        const res = await attachFile(formData);
        setUploadedFiles((prevFiles) => [...prevFiles, file]);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
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
    return null;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleChangeInput = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  return (
    <div className="d-flex row ">
      {showLoading && <Loading />}
      <div className=" mt-2 container-fluid">
        <Col className="bg-white h_messages shadow rounded-top-2">
          <div
            className="d-flex m-1 bg-white justify-content-center p-2"
            style={{ flexDirection: "column", display: "flex" }}
          >
            <Messages messages={messages} messagesEndRef={messagesEndRef} />
            <div className="mt-2">
              {uploadedFiles?.map((file, index) => (
                <div key={index} className="file-preview">
                  {renderFilePreview(file)}
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </div>
      <Form className="justify-content-center mb-4">
        <Col
          xl="12"
          xxl="12"
          className="py-1  d-flex justify-content-center rounded-bottom-2 shadow border-top bg-light"
        >
          <Col className="d-flex justify-content-center align-items-center mb-3 gap-3 p-1">
            <i
              onClick={handleSendMessage}
              className="cursorPointer font25 mt-4 text-primary font25 d-flex align-items-center bi bi-send"
            />
            {userId === "39" && (
              <SelectMultiTable
                xxl={2}
                xl={2}
                className="mb-2"
                itemName={"userName"}
                selected={selectedUserMention}
                setSelected={setSelectedUserMention}
                submit={() => setGetUserMention(selectedUserMention)}
                allListRF={allMemberGroup}
              />
            )}
            <div className="">
              <i
                onClick={() => hiddenFileInput.current.click()}
                className="d-flex mt-3 align-items-center justify-content-center text-primary font25 cursorPointer bi bi-paperclip"
              />
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleFileSend}
                style={{ display: "none" }}
              />
            </div>
            <Col className="mt-3" xs="8" md="8" xl="8">
              <Form.Control
                // onKeyPress={handleKeyPress}
                onKeyDown={handleKeyPress}
                xxl={10}
                xl={10}
                xs={10}
                chatMessage
                className="d-flex"
                name="title"
                ref={titleInputRef}
                value={title}
                onChange={handleChangeInput}
              />
            </Col>
          </Col>
        </Col>
      </Form>
    </div>
  );
};

export default ChatMessage;
