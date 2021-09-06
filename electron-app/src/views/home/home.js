import { React, useState, useEffect } from "react";
import "./home.scss";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
const axios = require("axios");
const Home = (props) => {
  const streamingServices = ["Twitch", "BBCIPlayer", "YouTube"];
  const [service, setService] = useState("");
  const history = useHistory();

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
      <Form>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formPlaintextStreamingService"
        >
          <Form.Label column sm="3">
            Streaming Service:
          </Form.Label>
          <Col sm="8">
            <Autocomplete
              id="combo-box-demo"
              options={streamingServices}
              getOptionLabel={(option) => option}
              style={{ marginLeft: "0px" }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
              onChange={(event, value) => {
                setService(value);
              }}
            />
          </Col>
        </Form.Group>

        <Button
          onClick={() => {
            history.push(`/${service.toLowerCase()}`);
            history.go();
          }}
        >
          Next
        </Button>
      </Form>
    </Container>
  );
};

export default Home;
