import React, { useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import Modal from "../../../../../components/Modal";
import { Col, Row } from "react-bootstrap";
import SelectMultiTable from "../../../../../components/SelectMultiTable";
import { Form } from "react-bootstrap";
import { postGroup } from "../../../../../services/dotNet";
import StringHelpers from "../../../../../utils/StringHelpers";

const AddRoom = ({ showRoom, setShowRoom, isEditRoom, allMemberGroup }) => {
  const getUserId = sessionStorage.getItem("userId");

  const [groupName, setGroupName] = useState("");
  const [selectedUserMention, setSelectedUserMention] = useState([]);
  const [getUserMention, setGetUserMention] = useState([]);

  // const handleChangeInputs = (name, value) => {
  //   setInputFields((prevstate) => {
  //     return { ...prevstate, [name]: value };
  //   });
  //   console.log(name, value);
  // };

  const handleAddGroup = async () => {
    const postData = {
      mentionMmr: selectedUserMention,
      groupName: groupName,
      userId: Number(getUserId),
      groupId: StringHelpers?.generateId(24),
    };
    const res = await postGroup(postData);
  };

  return (
    <div>
      <Modal
        size="lg"
        label={!isEditRoom ? "ایجاد" : "ویرایش"}
        isOpen={true}
        classHeader="bg-success text-white fw-bold"
        footerButtons={[
          <Button
            text="Outlined"
            stylingMode="outlined"
            type="danger"
            onClick={() => setShowRoom(false)}
            label="لغو"
          />,
          <Button
            onClick={handleAddGroup}
            type="outline-success"
            label="تایید"
          />,
        ]}
      >
        <Row className="d-flex justify-content-center align-items-center">
          <Col xxl="12" className="my-4">
            <Form.Label> نام گروه: </Form.Label>
            <Form.Control
              name="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Col>
          <Col>
            <SelectMultiTable
              xxl={12}
              xl={12}
              itemName={"userName"}
              selected={selectedUserMention}
              setSelected={setSelectedUserMention}
              submit={() => setGetUserMention(selectedUserMention)}
              allListRF={allMemberGroup}
              label="اعضای گروه:"
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default AddRoom;
