import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const AddGroup = ({ showAddGroup, setShowAddGroup }) => {
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = async () => {
    const postData = {
      name: groupName,
    };
    const res = await axios.post(
      // `https://pepapi.minoomart.ir/api/User/authUser`,
      `http://localhost:4004/api/chatRoom`,
      postData
    );
    if (res?.data?.status === "Success") {
      sessionStorage.setItem("token", res?.data?.data?.token);
      setRedirect(true);
    }
    console.log(res);
  };

  return (
    <div>
      <Modal centered show={showAddGroup} onHide={() => setShowAddGroup(false)}>
        <Modal.Header>
          <Modal.Title>ایجاد گروه</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="d-flex gap-5">
            <Col xxl="12">
              <Form.Label className="d-flex">نام گروه</Form.Label>
              <Form.Control
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className=""
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Col xxl="12">
            <Button
              onClick={handleCreateGroup}
              className="w-50"
              variant="outline-success"
            >
              ایجاد
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddGroup;
