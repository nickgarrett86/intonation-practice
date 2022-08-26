import React, { useState, useEffect, useRef } from "react";
import { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import {
  noteFromPitch,
  centsOffFromPitch,
  getDetunePercent,
} from "../lib/Helpers";
import GaugeChart from "react-gauge-chart";

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

const TuningVisualizer = ({ actualPitch, desiredPitch, ratingRatios }) => {
  const [size, setSize] = useState([0, 0]);
  const divRef = useRef();

  const chartStyle = useMemo(
    () => ({
      height: size[0] / 2 - 2 * size[1] * 0.05,
    }),
    [size]
  );

  const desiredNote = useMemo(
    () => noteFromPitch(desiredPitch),
    [desiredPitch]
  );

  const label = useCallback(
    () =>
      desiredNote > 0 ? noteStrings[noteFromPitch(desiredPitch) % 12] : "",
    [desiredNote]
  );
  const percent = useMemo(
    () =>
      actualPitch !== 0
        ? getDetunePercent(centsOffFromPitch(actualPitch, desiredPitch)) / 100.0
        : 0,
    [actualPitch]
  );

  const arcsLength = useMemo(
    () => [
      ratingRatios[0],
      ratingRatios[1],
      ratingRatios[2],
      ratingRatios[1],
      ratingRatios[0],
    ],
    [ratingRatios]
  );

  useEffect(() => {
    if (divRef.current) {
      setSize([
        divRef.current.getBoundingClientRect().width,
        divRef.current.getBoundingClientRect().height,
      ]);
    }
  }, [divRef.current]);

  useEffect(() => {
    const handleResize = () => {
      setSize([
        divRef.current.getBoundingClientRect().width,
        divRef.current.getBoundingClientRect().height,
      ]);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div ref={(r) => (divRef.current = r)}>
      <GaugeChart
        id="tuning-visualizer-chart"
        style={chartStyle}
        percent={percent}
        arcsLength={arcsLength}
        colors={["#FF0000", "#FFFF00", "#00FF00", "#FFFF00", "#FF0000"]}
        arcPadding={0.02}
        animate={false}
        textColor="#000000"
        formatTextValue={label}
      />
    </div>
  );
};

TuningVisualizer.propTypes = {
  actualPitch: PropTypes.number.isRequired,
  desiredPitch: PropTypes.number.isRequired,
  ratingRatios: PropTypes.arrayOf(PropTypes.number),
};
TuningVisualizer.defaultProps = {
  ratingRatios: [0.3, 0.15, 0.1],
};

export default TuningVisualizer;
