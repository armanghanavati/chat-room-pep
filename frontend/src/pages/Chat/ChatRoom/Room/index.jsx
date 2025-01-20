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
  const [msgNutif, setMsgNutif] = useState(0);

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
                className="col-xxl-12 hover bg-primary text-white col-xl-12 col-12 d-flex cursorPointer none_hover rounded-2 mb-3 p-3"
              >
                {false ? (
                  <div className="col-2 d-flex  ">
                    <span className="text-danger d-flex align-items-center px-2 rounded-pill border">
                      {msgNutif}
                    </span>
                  </div>
                ) : (
                  <div className="col-2"> </div>
                )}
                <span className="col-8 d-flex justify-content-center">
                  گپ عمومی
                </span>
              </div>
            </div>
            {allRoom?.length &&
              allRoom?.map((room) => {
                return (
                  <div className="d-flex row">
                    <div
                      onClick={() => handleRoomClick({ room: room })}
                      className="d-flex col-xxl-12 hover text-white col-xl-12 col-12 d-flex cursorPointer border rounded-2 mb-3 p-3"
                    >
                      {false ? (
                        <div className="col-2 d-flex  ">
                          <span className="text-danger d-flex align-items-center px-2 rounded-pill border">
                            {msgNutif}
                          </span>
                        </div>
                      ) : (
                        <div className="col-2"> </div>
                      )}
                      <span className="col-8 d-flex justify-content-center ">
                        {room?.groupName}
                      </span>
                      <span className="d-flex justify-content-end col-2">
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
