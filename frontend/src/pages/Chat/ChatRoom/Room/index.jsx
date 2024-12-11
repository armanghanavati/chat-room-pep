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
  socket,
  handleGetAllGroup,
  handleAddGroup,
  allRoom,
  isEditRoom,
}) => {
  const [showRoom, setShowRoom] = useState(false);

  return (
    <>
      {showLoading && <Loading />}
      <div className="col-xs-12 justify-content-center p-3 rounded-3 shadow border trans bg_rooms h_rooms mb-3 col-md-12 col-xxl-3">
        <div
          className="d-flex cursorPointer rounded-4 align-items-center hover justify-content-center"
          onClick={() => setShowRoom(true)}
        >
          <p className="d-flex p-2 mt-4">
            <i className="text-white d-flex mx-2 align-items-center bi bi-plus-circle-fill cursorPointer" />
            <span className="text-white">ایجاد گروه</span>
          </p>
        </div>
        <div className=" col-12 none_hover my-2 rounded-2">
          <div className="d-flex row justify-content-center">
            <div className="d-flex row">
              <div
                onClick={() => handleRoomClick({ room: 0 })}
                className="col-xxl-12 hover bg-primary text-white col-xl-12 col-12 d-flex cursorPointer none_hover justify-content-center rounded-2 mb-3 p-3"
              >
                گپ عمومی
              </div>
            </div>
            {allRoom?.length &&
              allRoom?.map((room) => {
                return (
                  <div className="d-flex row">
                    <div
                      onClick={() => handleRoomClick({ room: room })}
                      className="d-flex col-xxl-12 hover text-white col-xl-12 col-12 d-flex cursorPointer justify-content-around border rounded-2 mb-3 p-3"
                    >
                      <span></span>
                      <span>{room?.groupName}</span>
                      <span>
                        <i className="font20 bi bi-three-dots-vertical" />
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {showRoom && (
        <AddRoom
          handleGetAllGroup={handleGetAllGroup}
          socket={socket}
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
