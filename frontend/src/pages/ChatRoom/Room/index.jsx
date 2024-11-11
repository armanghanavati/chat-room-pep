import React from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import ChatMessage from "../Chat/ChatMessage";

const Room = () => {
  return (
    <>
      <ChatMessage />
    </>
  );
};

export default Room;

// <Container className="vw-100 vh-100 bg-light">
// <div className="">
//   <div className="d-flex p-4 justify-content-center align-items-center">
//     <Col
//       xs="12"
//       sm="9"
//       md="7"
//       lg="6"
//       xl="4"
//       className="bg-white shadow mx-auto my-auto p-4 rounded-4 "
//     >
//       <form className="justify-content-center bg-white">
//         {/* <ChatMessage /> */}
//         <div className="countainer_chat w-50 pt-4 border-top">
//           <Col xxl="12" className="d-flex gap-2">
//             <Button> ارسال </Button>
//             <Form.Control className="" />
//           </Col>
//         </div>
//       </form>
//     </Col>
//   </div>
// </div>
// </Container>
