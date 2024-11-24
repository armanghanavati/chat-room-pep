import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import AddRoom from "./AddRoom/index";

const Room = () => {
  const [showRoom, setShowRoom] = useState(false);
  const [isEditRoom, setIsEditRoom] = useState(false);

  const handleAddGroup = () => {
    console.log("Hello add");
    setShowRoom(true);
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col
          className="justify-content-center p-3 mb-3"
          xs="12"
          md="12"
          xxl="8"
        >
          <Col
            xxl="12"
            onClick={handleAddGroup}
            className="d-flex cursorPointer none_hover justify-content-between border-bottom rounded-2 mb-3 p-3"
          >
            <i className="bi bi-plus-circle-fill cursorPointer" />
            ایجاد گروه
          </Col>
          <Col
            xxl="12"
            className="d-flex justify-content-between border rounded-2 mb-3 p-3"
          >
            <i className="bi bi-gear-fill cursorPointer" />
            گروه آیتی
          </Col>
          <Col
            xxl="12"
            className="d-flex justify-content-between border rounded-2 p-3 my-3"
          >
            <i className="bi bi-gear-fill cursorPointer" />
            گروه آیتی
          </Col>
        </Col>
      </Row>
      {/* {showRoom && (
        <AddRoom
          isEditRoom={isEditRoom}
          showRoom={showRoom}
          setShowRoom={setShowRoom}
        />
      )} */}
    </>
  );
};

export default Room;
