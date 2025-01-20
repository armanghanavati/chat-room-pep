import React, { useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import Modal from "../../../../../components/Modal";
import { Col, Row } from "react-bootstrap";
import SelectMultiTable from "../../../../../components/SelectMultiTable";
import { Form } from "react-bootstrap";
import { postGroup } from "../../../../../services/dotNet";
import StringHelpers from "../../../../../utils/StringHelpers";
import { useMyContext } from "../../../../../context";

const AddRoom = ({
  handleGetAllGroup,
  setShowRoom,
  isEditRoom,
  showRoom,
  allMemberGroup,
  socket,
}) => {
  const getUserId = sessionStorage.getItem("userId");
  const [groupName, setGroupName] = useState("");
  const { setShowToast } = useMyContext();

  const [selectedUserMention, setSelectedUserMention] = useState([]);
  const [getUserMention, setGetUserMention] = useState([]);

  const handleAddGroup = async () => {
    const postData = {
      mentionMmr: selectedUserMention,
      groupName: groupName,
      userId: Number(getUserId),
    };
    const res = await postGroup(postData);
    const { data, code } = res.data;
    if (code === 0) {
      console.log(data);
      socket.emit("add_group", { groupName, userId: Number(getUserId) });
      console.log("data");
      handleGetAllGroup();
      setShowRoom(false);
      setShowToast({
        show: true,
        bg: "success",
        title: "با موفقیت ثبت شد",
      });
    } else {
      setShowToast({
        show: true,
        bg: "danger",
        title: "مشکلی در سرور به وجود آمده است",
      });
    }
  };

  return (
    <div>
      <Modal
        size="lg"
        label={!isEditRoom ? "ایجاد" : "ویرایش"}
        isOpen={showRoom}
        classHeader="bg-primary text-white fw-bold"
        footerButtons={[
          <Button
            className="w-25"
            text="Outlined"
            stylingMode="outlined"
            type="danger"
            onClick={() => setShowRoom(false)}
            label="لغو"
          />,
          <Button
            className="w-25"
            onClick={handleAddGroup}
            type="outline-success"
            label="تایید"
          />,
        ]}
      >
        <Row className="d-flex justify-content-center align-items-center mb-4">
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
