import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AddRoom from "./AddRoom/index";
import { getAllGroup } from "../../../../services/dotNet";
import Loading from "../../../../components/Loading";

const Room = ({ allMemberGroup, showLoading, setShowLoading }) => {
  const [showRoom, setShowRoom] = useState(false);
  const [isEditRoom, setIsEditRoom] = useState(false);

  const handleAddGroup = () => {
    setShowRoom(true);
  };

  const handleGetAllGroup = async () => {
    try {
      setShowLoading(true);
      const res = await getAllGroup();
      setShowLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllGroup();
  }, []);

  return (
    <>
      {showLoading && <Loading />}
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
          {}
        </Col>
      </Row>
      {showRoom && (
        <AddRoom
          allMemberGroup={allMemberGroup}
          isEditRoom={isEditRoom}
          showRoom={showRoom}
          setShowRoom={setShowRoom}
        />
      )}
    </>
  );
};

export default Room;
