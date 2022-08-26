import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Practice from "./Practice";

const totalTime = 30_000; // ms

const TimedPractice = (props) => {
  const [correctNoteCount, setCorrectNoteCount] = useState(0);
  const [start, setStart] = useState(false);
  const [completed, setCompleted] = useState(false);

  const updateCorrectNotes = useCallback(() => {
    setCorrectNoteCount((c) => c + 1);
  }, [setCorrectNoteCount]);

  const restart = () => {
    setStart(true);
    setCompleted(false);
    setCorrectNoteCount(0);
  };

  // Start timer on start
  useEffect(() => {
    if (start) {
      const completeRound = () => {
        setCompleted(true);
        setStart(false);
      };
      const t = setTimeout(() => completeRound(), totalTime);
      () => clearTimeout(t);
    }
  }, [start]);

  return (
    <>
      {completed && <p>You scored: {correctNoteCount}</p>}
      <div>Correct notes : {correctNoteCount}</div>
      <Practice
        {...props}
        badTimeToNext={totalTime}
        onCorrect={updateCorrectNotes}
        pause={completed}
      />
      {!start && <Button onClick={() => restart()}>Start</Button>}
    </>
  );
};

export default TimedPractice;
