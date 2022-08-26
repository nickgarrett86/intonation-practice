import React from "react";
import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import TuningVisualizer from "./TuningVisualizer";
import Button from "react-bootstrap/Button";
import {
  frequencyFromNoteNumber,
  centsOffFromNote,
  noteFromPitch,
  getRandomIntInclusive,
} from "../lib/Helpers";

const checkPeriod = 10; // ms

const goodPercentage = 0.1;
const mediumPercentage = (1 - goodPercentage) / 2 / 3;
const badPercentage = (1 - goodPercentage - mediumPercentage * 2) / 2;

const Practice = ({
  pitch,
  pitchRange,
  goodTimeToNext,
  badTimeToNext,
  badTimeToResetGood,
  goodTimeToResetBad,
  onCorrect,
  onWrong,
  pause,
}) => {
  const [desiredNote, setDesiredNote] = useState(50);
  const [nextPitch, setNextPitch] = useState(false);
  const [badTime, setBadTime] = useState(0);
  const [goodTime, setGoodTime] = useState(0);
  const [checkPitch, setCheckPitch] = useState(false);

  const resetState = () => {
    setNextPitch(false);
    setBadTime(0);
    setGoodTime(0);
    setCheckPitch(false);
  };

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
    if (checkPitch && !pause) {
      setCheckPitch(false);
      if (
        Math.abs(centsOffFromNote(pitch, desiredNote)) <
        goodPercentage * 100
      ) {
        setGoodTime((gt) => gt + checkPeriod);
      } else {
        setBadTime((bt) => bt + checkPeriod);
      }
    }
  }, [checkPitch, pitch, pause]);

  useEffect(() => {
    if (goodTime > goodTimeToNext) {
      onCorrect();
      setNextPitch(true);
    } else if (goodTime > goodTimeToResetBad) {
      setBadTime(0);
    }
  }, [goodTime, onCorrect, setBadTime]);

  useEffect(() => {
    if (badTime > badTimeToNext) {
      onWrong();
      setNextPitch(true);
    } else if (badTime > badTimeToResetGood) {
      setGoodTime(0);
    }
  }, [badTime, onWrong, setGoodTime]);

  useEffect(() => {
    const updatePitch = () => {
      setCheckPitch(true);
    };

    const timerId = setInterval(updatePitch, checkPeriod);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (!pause) {
      resetState();
    }
  }, [pause]);

  return (
    <>
      <TuningVisualizer
        actualPitch={pitch}
        desiredPitch={desiredPitch}
        ratingRatios={[badPercentage, mediumPercentage, goodPercentage]}
      />
    </>
  );
};

Practice.propTypes = {
  pitch: PropTypes.number.isRequired,
  pitchRange: PropTypes.arrayOf(PropTypes.number),
  goodTimeToNext: PropTypes.number,
  badTimeToNext: PropTypes.number,
  badTimeToResetGood: PropTypes.number,
  goodTimeToResetBad: PropTypes.number,
  onCorrect: PropTypes.func,
  onWrong: PropTypes.func,
  pause: PropTypes.bool,
};

Practice.defaultProps = {
  pitchRange: [48, 59],
  goodTimeToNext: 2_000, // ms
  badTimeToNext: 2_000, // ms
  badTimeToResetGood: 200, // ms
  goodTimeToResetBad: 200, // ms
  onCorrect: () => {},
  onWrong: () => {},
  pause: false,
};

export default Practice;
