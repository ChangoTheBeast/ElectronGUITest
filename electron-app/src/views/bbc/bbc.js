import { React, useState, useEffect } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./bbc.scss";
import { Radio } from "@material-ui/core";
import { exec } from "child_process";
import { Switch } from "@material-ui/core";
const axios = require("axios");

const Bbc = (props) => {
  const history = useHistory();
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("");
  const [liveFlag, setLiveFlag] = useState("live");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [urlPlaceholder, setUrlPlaceholder] = useState("BBC One");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props.bbcCreds === false) {
      return;
    }
    setUsername(props.bbcCreds.bbcUsername);
    setPassword(props.bbcCreds.bbcPassword);
  }, [props.bbcCreds]);

  useEffect(() => {
    const host = "https://localhost:8080";
    axios.defaults.withCredentials = true;
    axios
      .post(host + "/getData")
      .then((response) => {})
      .catch((error) => {
        console.log(error.response.data.error);
        history.push("/login");
        history.go();
      });
  }, []);

  useEffect(() => {
    if (liveFlag === "vod") {
      setUrlPlaceholder(
        "e.g. https://www.bbc.co.uk/iplayer/episode/m000z2yh/mastermind-202122-episode-1"
      );
    } else {
      setUrlPlaceholder("e.g. BBC One");
    }
  }, [liveFlag]);

  const handleChange = (event) => {
    setLiveFlag(event.target.value);
  };

  const ConditionalFormGroup = () => {
    if (liveFlag === "live") {
      return (
        <Form.Label column sm="4">
          Enter the Channel you want to watch:
        </Form.Label>
      );
    } else if (liveFlag === "vod") {
      return (
        <Form.Label column sm="4">
          Enter the url of the BBC Video to watch:
        </Form.Label>
      );
    } else {
      return (
        <Form.Label column sm="4">
          Enter the Channel you want to watch:
        </Form.Label>
      );
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    const host = "https://localhost:8080";
    let bbcUrl = url;
    if (liveFlag === "live") {
      bbcUrl = url.toLowerCase().replace(" ", "");
    }
    const err = await axios
      .post(
        `${host}/bbciplayer`,
        {
          email: props.user.email,
          url: bbcUrl,
          quality: quality,
          liveFlag: liveFlag,
          username: username,
          password: password,
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
  };

  return (
    <Container>
      {error !== false && (
        <div className="mb-3">
          <a style={{ color: "red" }}>{error}</a>
        </div>
      )}
      <Form
        onSubmit={submit}
        onLoad={() => {
          console.log(props.bbcCreds);
          if (props.bbcCreds === false) {
            return;
          }
          setUsername(props.bbcCreds.bbcUsername);
          setPassword(props.bbcCreds.bbcPassword);
        }}
      >
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
        <Form.Group as={Row} className="mb-3">
          <ConditionalFormGroup />
          <Col sm="8">
            <Form.Control
              placeholder={urlPlaceholder}
              onChange={(event) => {
                setUrl(event.target.value);
              }}
              value={url}
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
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Username:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Password:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Button type="submit">Watch</Button>
      </Form>
    </Container>
  );
};

export default Bbc;
