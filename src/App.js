import React from "react";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AudioContext from "../lib/contexts/AudioContext";
import autoCorrelate from "../lib/AutoCorrelate";
import { noteFromPitch, frequencyFromNoteNumber } from "../lib/Helpers";
import TuningVisualizer from "./TuningVisualizer";

const audioCtx = AudioContext.getAudioContext();
const analyserNode = AudioContext.getAnalyser();
const buflen = 2048;
var buf = new Float32Array(buflen);

const App = () => {
  const [source, setSource] = useState(null);
  const [started, setStart] = useState(false);
  const [pitchNote, setPitchNote] = useState(0); // Pitch as note number
  const [pitch, setPitch] = useState(0); // pitch in hertz
  const [notification, setNotification] = useState(false);

  const updatePitch = (time) => {
    analyserNode.getFloatTimeDomainData(buf);
    var ac = autoCorrelate(buf, audioCtx.sampleRate);
    if (ac > -1) {
      setPitch(parseFloat(ac));
      // setPitchNote(53);
      setPitchNote(noteFromPitch(ac));
      setNotification(false);
      console.log(pitchNote);
    }
  };

  useEffect(() => {
    if (source != null) {
      source.connect(analyserNode);
    }
  }, [source]);

  setInterval(updatePitch, 1);

  const start = async () => {
    const input = await getMicInput();

    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }
    setStart(true);
    setNotification(true);
    setTimeout(() => setNotification(false), 5000);
    setSource(audioCtx.createMediaStreamSource(input));
  };

  const stop = () => {
    source.disconnect(analyserNode);
    setStart(false);
  };

  const getMicInput = () => {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0,
      },
    });
  };

  return (
    <Container>
      <Alert show={notification} variant="secondary">
        Please, bring your instrument near to the microphone!
      </Alert>
      <TuningVisualizer
        actualPitch={pitch}
        desiredPitch={frequencyFromNoteNumber(pitchNote)}
      />
      <Row>
        {!started ? (
          <Button variant="primary" onClick={start}>
            Start
          </Button>
        ) : (
          <Button variant="primary" onClick={stop}>
            Stop
          </Button>
        )}
      </Row>
    </Container>
  );
};

export default App;
