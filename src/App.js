import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tuner from "./Tuner";
import FreePractice from "./FreePractice";
import TimedPractice from "./TimedPractice";
import RacePractice from "./RacePractice";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Routes, Route, Link } from "react-router-dom";

import usePitchDetect from "../lib/usePitchDetect";

const App = () => {
  const { pitch, start, started } = usePitchDetect();

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">Tuning practice</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/tuner">
                Tuner
              </Nav.Link>
              <Nav.Link as={Link} to="/free-practice">
                Practice - Free
              </Nav.Link>
              <Nav.Link as={Link} to="/timed-practice">
                Practice - Timed
              </Nav.Link>
              <Nav.Link as={Link} to="/race-practice">
                Practice - Race
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<Tuner pitch={pitch} />} />
          <Route path="/tuner" element={<Tuner pitch={pitch} />} />
          <Route
            path="/free-practice"
            element={<FreePractice pitch={pitch} />}
          />
          <Route
            path="/timed-practice"
            element={<TimedPractice pitch={pitch} />}
          />
          <Route
            path="/race-practice"
            element={<RacePractice pitch={pitch} />}
          />
        </Routes>

        <Row>
          {!started && (
            <Button variant="primary" onClick={start}>
              Start microphone
            </Button>
          )}
        </Row>
      </Container>
    </>
  );
};

export default App;
