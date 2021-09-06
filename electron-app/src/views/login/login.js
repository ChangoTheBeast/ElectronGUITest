import { Button } from "react-bootstrap";
import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "./login.scss";
import {
  Container,
  Form,
  Row,
  Col,
  FormLabel,
  FormControl,
} from "react-bootstrap";

const axios = require("axios");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [registered, setRegistered] = useState("");
  const history = useHistory();
  const submit = async (event) => {
    event.preventDefault();
    console.log(email, password);
    const host = "https://localhost:8080";
    axios
      .post(
        `${host}/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then(function (response) {
        console.log("allowed");
        setError(false);
        history.push("/");
        history.go();
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };
  return (
    <Container>
      {error !== false && (
        <div className="mb-3">
          <a style={{ color: "red" }}>{error}</a>
        </div>
      )}
      {registered !== "" && (
        <h1 style={{ color: "green" }}>Successfully Registered</h1>
      )}
      <Form onSubmit={submit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <FormLabel column sm="2">
            Email:
          </FormLabel>
          <Col sm="10">
            <FormControl
              type="email"
              placeholder="name@example.com"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formSecretPassword">
          <FormLabel column sm="2">
            Password:
          </FormLabel>
          <Col sm="10">
            <FormControl
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Button type="submit" style={{ textAlign: "center", margin: "5px" }}>
          Login
        </Button>
        <Button
          onClick={() => {
            if (email !== "" && password !== "") {
              const host = "https://localhost:8080";
              axios
                .post(
                  `${host}/register`,
                  {
                    email: email,
                    password: password,
                  },
                  { withCredentials: true }
                )
                .then(function (response) {
                  if (response.status === 202) {
                    setRegistered(true);
                  } else {
                    setRegistered("");
                    setError(response.data.error);
                    console.log(response);
                  }
                })
                .catch(function (error) {
                  setRegistered("");
                  setError(error.response.data.error);
                });
            }
          }}
        >
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
