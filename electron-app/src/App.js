<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { React, useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import Home from "./views/home/home";
import {
  HashRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
} from "react-router-dom";
import Twitch from "./views/twitch/twitch";
import Bbc from "./views/bbc/bbc";
import Youtube from "./views/youtube/youtube";
import Login from "./views/login/login";

const axios = require("axios");

function App() {
  const [user, setUser] = useState(false);
  const [bbcCreds, setBbcCreds] = useState(false);
  const [authenicated, setAuthenticated] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(async () => {
    const host = "https://localhost:8080";
    axios.defaults.withCredentials = true;
    const err = axios
      .post(host + "/getData")
      .then((response) => {
        if (response.status === 200) {
          setAuthenticated(true);
          let { userId, email, bbcUsername, bbcPassword } = response.data;
          setUser({
            userId: userId,
            email: email,
          });
          setBbcCreds({
            bbcUsername: bbcUsername,
            bbcPassword: bbcPassword,
          });
        }
      })
      .catch((error) => {
        if (error.response !== undefined) {
          console.log(error.response.data.error);
        }
      });
  }, []);

  const ConditionalNavBar = () => {
    if (authenicated === true) {
      return (
        <Navbar expand="lg" variant={`${light ? "light" : "dark"}`}>
          <Container>
            <Navbar.Brand as={Link} to="/">
              StreamStarter
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/twitch">
                  Twitch
                </Nav.Link>
                <Nav.Link as={Link} to="/bbciplayer">
                  BBCIPlayer
                </Nav.Link>
                <Nav.Link as={Link} to="/youtube">
                  YouTube
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    setLight(!light);
                  }}
                >
                  <WbIncandescentOutlinedIcon />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
    return null;
  };

  return (
    <div>
      <div className={`theme " ${light ? "theme--light" : "theme--default"}`}>
        <div className="base">
          <Router basename="">
            <ConditionalNavBar />
            <div className="jumbotron">
              <h1>Stream Starter</h1>
            </div>
            <Switch>
              <Route path="/twitch">
                <Twitch />
              </Route>
              <Route path="/bbciplayer">
                <Bbc bbcCreds={bbcCreds} user={user} />
              </Route>
              <Route path="/youtube">
                <Youtube />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Home user={user} />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
>>>>>>> 561f6c0bbeb2b4d32a4fa01d40d6cf1bff4d1990
    </div>
  );
}

export default App;
