import React, { useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import Modal from "../../../../../components/Modal";
import { Row } from "react-bootstrap";
import SelectMultiTable from "../../../../../components/SelectMultiTable";
import { Form } from "react-bootstrap";

const AddRoom = ({ showRoom, setShowRoom, isEditRoom }) => {
  const [inputFields, setInputFields] = useState({});
  const [allMemberGroup, setAllMemberGroup] = useState([]);
  const [selectedUserMention, setSelectedUserMention] = useState([]);
  const [getUserMention, setGetUserMention] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  console.log(getUserMention);

  // const handleChangeInputs = (name, value) => {
  //   setInputFields((prevstate) => {
  //     return { ...prevstate, [name]: value };
  //   });
  //   console.log(name, value);
  // };

  const handleAllGroups = async () => {
    setShowLoading(true);
    const res = await allUsers();
    setShowLoading(false);

    const { data, status, message } = res;
    if (status == "Success") {
      setAllMemberGroup(data);
    }
  };

  console.log(selectedUserMention);

  useEffect(() => {
    // handleAllGroups();
  }, []);

  const handleAddGroup = async () => {
    const postData = {
      // usersId: users?.userId,
      recieverId: selectedUserMention,
      groupName: inputFields?.groupName,
    };
    const res = await postGroup(postData);
    console.log(res);
  };

  return (
    <div>
      <Modal
        size="lg"
        label={!isEditRoom ? "ایجاد" : "ویرایش"}
        isOpen={showRoom}
        footerButtons={[
          <Button
            text="Outlined"
            stylingMode="outlined"
            type="danger"
            onClick={() => setShowRoom(false)}
            label="لغو"
          />,
          <Button onClick={handleAddGroup} type="success" label="تایید" />,
        ]}
      >
        <Row className="d-flex justify-content-center align-items-center">
          <Form.Label> نام گروه: </Form.Label>
          <Form.Control
            name="groupName"
            value={inputFields?.groupName}
            onChange={(e) => setInputFields(e.target.value)}
          />
          <SelectMultiTable
            xxl={6}
            xl={6}
            itemName={"userName"}
            selected={selectedUserMention}
            setSelected={setSelectedUserMention}
            submit={() => setGetUserMention(selectedUserMention)}
            allListRF={allMemberGroup}
            label="اعضای گروه:"
          />
        </Row>
      </Modal>
    </div>
  );
};

export default AddRoom;
