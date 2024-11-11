import React, { useState } from "react";
import ChatRoom from "../ChatRoom/index";
import { Button, Card, Container, Form } from "react-bootstrap";
import axios from "axios";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [redirect, setRedirect] = useState(false);
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = async () => {
    const postData = {
      username: inputs?.userName,
      password: inputs?.password,
    };
    const res = await axios.post(
      `https://pepapi.minoomart.ir/api/User/authUser`,
      postData
    );
    if (res?.data?.status === "Success") {
      const Token = res?.data?.data?.token;
      const userData = jwt(Token);
      let Vals = Object?.values(userData);
      const UserId = Vals[1];
      const resLogin = await axios.get(
        `http://localhost:4004/api/login/${UserId}`
      );
      sessionStorage.setItem("userName", userData?.iss);
      sessionStorage.setItem("userId", UserId);
      sessionStorage.setItem("token", res?.data?.data?.token);
      navigate(`/home`);
      setRedirect(true);
    }
  };

  return (
    <div>
      <div className="vh-100 bg-light align-items-center d-flex">
        <Container className=" d-flex justify-content-center">
          <Card className="col-5  p-4">
            <div className="my-2">
              <label> Username: </label>
              <Form.Control
                value={inputs.userName}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    userName: e.target.value,
                  }))
                }
                className=""
              />
            </div>
            <div className="my-2">
              <label> Password: </label>
              <Form.Control
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                value={inputs.password}
                className=""
              />
            </div>
            <Button className="my-2" onClick={handleSubmit}>
              Submit
            </Button>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Home;
