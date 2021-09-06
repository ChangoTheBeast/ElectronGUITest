import { React, useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Radio } from "@material-ui/core";

const axios = require("axios");

const Twitch = () => {
  const [url, setUrl] = useState("");
  const [liveFlag, setLiveFlag] = useState("live");
  const [quality, setQuality] = useState("");
  const [videoID, setVideoID] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  const submit = async (event) => {
    event.preventDefault();
    const host = "https://localhost:8080";
    if (liveFlag === "live") {
      const err = await axios
        .post(
          `${host}/twitch`,
          {
            url: url,
            quality: quality,
            videoID: "live",
          },
          { withCredentials: true }
        )
        .then(function (response) {
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
    } else {
      const err = await axios
        .post(
          `${host}/twitch`,
          {
            url: url,
            quality: quality,
            videoID: videoID,
          },
          { withCredentials: true }
        )
        .then(function (response) {
          console.log("allowed");
          // setError("");
          history.push("/home");
          history.go();
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
    }
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

  const handleChange = (event) => {
    setLiveFlag(event.target.value);
  };

  useEffect(() => {
    console.log(visible);
    if (liveFlag === "vod") {
      console.log("hi");
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [liveFlag]);

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
            Enter the streamer you would like to watch:
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
              onChange={(event) => {
                setQuality(event.target.value);
              }}
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label sm="5">Live</Form.Label>
          <Radio
            sm="5"
            checked={liveFlag === "live"}
            onChange={handleChange}
            value="live"
            name="radio-button-demo"
            inputProps={{ "aria-label": "Live" }}
            label="Live"
          />
          <Form.Label sm="5">VOD</Form.Label>
          <Radio
            sm="5"
            checked={liveFlag === "vod"}
            onChange={handleChange}
            value="vod"
            name="radio-button-demo"
            inputProps={{ "aria-label": "VOD" }}
          />
        </Form.Group>
        {visible && (
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              VideoID:
            </Form.Label>
            <Col sm="8">
              <Form.Control
                onChange={(event) => {
                  setVideoID(event.target.value);
                }}
              ></Form.Control>
            </Col>
          </Form.Group>
        )}

        <Button type="submit">Watch</Button>
      </Form>
    </Container>
  );
};

export default Twitch;
