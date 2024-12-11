import React, { useEffect } from "react";
import { Toast, ToastBody, ToastHeader, Col, Row } from "reactstrap";
import { useMyContext } from "../context";

const Toastify = () => {
  const { showToast, setShowToast } = useMyContext();

  const oparationIcons = () => {
    if (showToast?.bg === "danger") {
      return (
        <i className="font20 d-flex text-white bi bi-exclamation-triangle-fill" />
      );
    }
    if (showToast?.bg === "success") {
      return <i className="font20 d-flex text-white bi bi-check-circle-fill" />;
    }
    if (showToast?.bg === "warning") {
      return (
        <i className="font20 d-flex text-white bi bi-exclamation-triangle-fill" />
      );
    }
  };

  useEffect(() => {
    if (showToast?.show) {
      const timer = setTimeout(() => {
        setShowToast({ show: false });
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showToast, setShowToast]);

  return (
    <Row className="d-flex toastContainer">
      <Col xs="10" sm="10" xl="12" className="d-flex">
        <Toast
          onClose={() => setShowToast({ show: false })}
          show={showToast?.show}
          autohide
        >
          <ToastHeader
            className={` ${
              showToast?.bg === "success"
                ? "bg-success"
                : showToast?.bg === "danger"
                ? "bg-danger"
                : ""
            } `}
          >
            <strong className="text-white justify-content-center  me-auto">
              {oparationIcons()}
            </strong>
          </ToastHeader>
          <ToastBody
            className={`d-flex py-4 justify-content-end text-end text-dark`}
          >
            {showToast?.title}
          </ToastBody>
        </Toast>
      </Col>
    </Row>
  );
};

export default Toastify;
