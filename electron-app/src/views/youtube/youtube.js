import axios from "axios";
import { React, useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Youtube = () => {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const submit = (event) => {
    event.preventDefault();
    const host = "https://localhost:8080";
    let videoId = url;
    if (url.includes("watch?v")) {
      videoId = url.split("=")[1].split("&")[0];
    }
    const err = axios
      .post(
        `${host}/youtube`,
        {
          url: videoId,
          quality: quality,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("allowed");
        // setError("");
        history.push("/home");
        history.go();
      })
      .catch((err) => {
        if (error.response !== undefined) {
          setError(err.response.data.error);
          console.log(error.response.data.error);
        }
      });
  };

  useEffect(() => {
    const host = "https://localhost:8080";
    axios.defaults.withCredentials = true;
    axios
      .post(host + "/getData")
      .then((response) => {})
      .catch((error) => {
        if (error.response !== undefined) {
          console.log(error.response.data.error);
        }
        history.push("/login");
        history.go();
      });
  }, []);

  return (
    <Container>
      {error !== false && (
        <div className="mb-3">
          <a style={{ color: "red" }}>{error}</a>
        </div>
      )}
      <Form onSubmit={submit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Enter the VideoID of the Stream/Video:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              onChange={(event) => {
                setUrl(event.target.value);
              }}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Quality:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              placeholder="best"
              onChange={(event) => {
                setQuality(event.target.value);
              }}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Button type="submit">Watch</Button>
      </Form>
    </Container>
  );
};

export default Youtube;
