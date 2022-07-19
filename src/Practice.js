import React from "react";
import { useState, useEffect, useMemo } from "react";
import TuningVisualizer from "./TuningVisualizer";
import {
  frequencyFromNoteNumber,
  centsOffFromNote,
  noteFromPitch,
} from "../lib/Helpers";

const getRandomIntInclusive = ([min, max]) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

const pitchRange = [58, 69];
const goodTimeToNext = 2_000; // ms
const badTimeToNext = 10_000; // ms
const checkPeriod = 10; // ms

const goodPercentage = 0.1;
const mediumPercentage = (1 - goodPercentage) / 2 / 3;
const badPercentage = (1 - goodPercentage - mediumPercentage * 2) / 2;

const Practice = ({ pitch }) => {
  const [desiredNote, setDesiredNote] = useState(60);
  const [nextPitch, setNextPitch] = useState(false);
  const [badTime, setBadTime] = useState(0);
  const [goodTime, setGoodTime] = useState(0);
  const [checkPitch, setCheckPitch] = useState(false);

  const desiredPitch = useMemo(
    () => frequencyFromNoteNumber(desiredNote),
    [desiredNote]
  );

  useEffect(() => {
    if (nextPitch) {
      setDesiredNote(getRandomIntInclusive(pitchRange));
      setNextPitch(false);
      setBadTime(0);
      setGoodTime(0);
    }
  }, [nextPitch]);

  useEffect(() => {
    if (checkPitch) {
      setCheckPitch(false);
      if (
        Math.abs(centsOffFromNote(pitch, desiredNote)) <
        goodPercentage * 100
      ) {
        setGoodTime((gt) => gt + checkPeriod);
      } else {
        setBadTime((bt) => bt + checkPeriod);
        setGoodTime(0);
      }
    }
  }, [checkPitch, pitch]);

  useEffect(() => {
    if (goodTime > goodTimeToNext) {
      setNextPitch(true);
    }
  }, [goodTime]);

  useEffect(() => {
    if (badTime > badTimeToNext) {
      setNextPitch(true);
    }
  }, [badTime]);

  useEffect(() => {
    const updatePitch = () => {
      setCheckPitch(true);
    };

    const timerId = setInterval(updatePitch, checkPeriod);
    return () => clearInterval(timerId);
  }, []);

  return (
    <>
      desired note: {desiredNote}
      actual note: {noteFromPitch(pitch)}
      <TuningVisualizer
        actualPitch={pitch}
        desiredPitch={desiredPitch}
        ratingRatios={[badPercentage, mediumPercentage, goodPercentage]}
      />
    </>
  );
};

export default Practice;
