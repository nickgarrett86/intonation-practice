import React from "react";
import {
  noteFromPitch,
  centsOffFromPitch,
  getDetunePercent,
} from "../lib/Helpers";
import Stack from "react-bootstrap/Stack";

const noteStrings = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const TuningVisualizer = ({ actualPitch, desiredPitch }) => (
  <Stack>
    <div>{noteStrings[noteFromPitch(desiredPitch) % 12]}</div>
    <div>{centsOffFromPitch(actualPitch, desiredPitch)}</div>
  </Stack>
);

export default TuningVisualizer;
