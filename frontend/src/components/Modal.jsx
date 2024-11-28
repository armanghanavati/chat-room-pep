import React from "react";
import { Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const index = ({
  classHeader = "text-white",
  children,
  isOpen,
  centered = true,
  label,
  onClose,
  footerButtons = [],
  size,
}) => {
  return (
    <Col>
      <Modal
        style={{ direction: "rtl" }}
        isOpen={isOpen}
        toggle={onClose}
        className="fontStyle"
        centered={centered}
        size={size}
      >
        <ModalHeader
          style={{ transform: "scale(-1, 1)", direction: "ltr" }}
          className={classHeader}
          toggle={onClose}
        >
          <div style={{ transform: "scale(-1, 1)" }}>{label}</div>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footerButtons?.map((btn) => btn)}</ModalFooter>
      </Modal>
    </Col>
  );
};

export default index;
