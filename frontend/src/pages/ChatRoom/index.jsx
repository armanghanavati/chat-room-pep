import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AddGroup from "../Group/AddGroup";
import { useNavigate } from "react-router-dom";

const ChatRoom = ({ allGp, setRoomItem }) => {
  const [showAddGroup, setShowAddGroup] = useState(false);
  const navigate = useNavigate();

  const handleShowRoom = (roomItem) => {
    setRoomItem(roomItem);
    navigate(`/home/${roomItem.id}`);
  };

  return (
    <div className="p-4 border shadow m-2">
      <form className="justify-content-center bg-white">
        {/* <Button onClick={handleGetUserDetail}>پروفایل</Button> */}
        <Button onClick={() => setShowAddGroup(true)}>+ ایجاد گروه</Button>
      </form>
      {/* <div>
                <span className="border p-2 mt-5">گروهی وجود ندارد</span>
              </div> */}

      <Col xl="12" className="my-2 rounded-2 d-flex justify-content-center">
        <Row>
          {allGp?.map((item) => (
            <Col
              xl="12"
              className="bg-light p-2 my-2 d-flex justify-content-around align-items-center"
            >
              <span className="border p-2 rounded bg-white"> حذف </span>
              <span
                className="bg-white cursor-pointer"
                onClick={() => handleShowRoom(item)}
              >
                {item?.name}
              </span>
              <span className="border p-2 rounded bg-white">ویرایش</span>
            </Col>
          ))}
        </Row>
      </Col>
      {showAddGroup && (
        <AddGroup
          showAddGroup={showAddGroup}
          setShowAddGroup={setShowAddGroup}
        />
      )}
    </div>
  );
};

export default ChatRoom;
