import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AddRoom from "./AddRoom/index";
import { getAllGroup } from "../../../../services/dotNet";
import Loading from "../../../../components/Loading";
import { useMyContext } from "../../../../context";

const Room = ({
  allMemberGroup,
  showLoading,
  setShowLoading,
  handleRoomClick,
}) => {
  const { userInfo } = useMyContext();
  const [showRoom, setShowRoom] = useState(false);
  const [isEditRoom, setIsEditRoom] = useState(false);
  const [allRoom, setAllRoom] = useState([]);

  const handleAddGroup = () => {
    setShowRoom(true);
  };

  const handleGetAllGroup = async () => {
    try {
      setShowLoading(true);
      const res = await getAllGroup(userInfo?.userId);
      const { data, code } = res.data;
      console.log(data);
      setAllRoom(data);
      setShowLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllGroup();
  }, [userInfo]);

  return (
    <>
      {showLoading && <Loading />}
      <div className="col-xs-12 justify-content-center p-3 rounded-3 shadow border mb-3 col-md-12 col-xxl-3">
        <div
          className="d-flex cursorPointer rounded-4 align-items-center hover justify-content-center border-bottom"
          onClick={handleAddGroup}
        >
          <p className="d-flex p-2">
            <i className="d-flex mx-2 align-items-center bi bi-plus-circle-fill cursorPointer" />
            <span className="">ایجاد گروه</span>
          </p>
        </div>
        <div className=" col-12 none_hover my-2 rounded-2">
          <div className="d-flex row justify-content-center">
            {allRoom?.map((room) => {
              return (
                <div className="d-flex row">
                  <div
                    onClick={() => handleRoomClick(room)}
                    className="col-xxl-12 hover bg-primary text-white col-xl-12 col-12 d-flex cursorPointer none_hover justify-content-center border-bottom rounded-2 mb-3 p-3"
                  >
                    {room.groupName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
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
