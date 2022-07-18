import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tuner from "./Tuner";

import usePitchDetect from "../lib/usePitchDetect";

const App = () => {
  const { pitch, start, started } = usePitchDetect();

  return (
    <Container>
      <Row>
        <Tuner pitch={pitch} />
      </Row>

      <Row>
        {!started && (
          <Button variant="primary" onClick={start}>
            Start microphone
          </Button>
        )}
      </Row>
    </Container>
  );
};

export default App;
