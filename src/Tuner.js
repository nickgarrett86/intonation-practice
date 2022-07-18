import React from "react";
import { noteFromPitch, frequencyFromNoteNumber } from "../lib/Helpers";
import TuningVisualizer from "./TuningVisualizer";

const Tuner = ({ pitch }) => (
  <TuningVisualizer
    actualPitch={pitch}
    desiredPitch={frequencyFromNoteNumber(noteFromPitch(pitch))}
    ratingRatios={[0.3, 0.15, 0.1]}
  />
);

export default Tuner;
