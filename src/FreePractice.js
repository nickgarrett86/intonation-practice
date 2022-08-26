import React, { useState, useCallback } from "react";
import Practice from "./Practice";

const FreePractice = (props) => {
  const [correctNoteCount, setCorrectNoteCount] = useState(0);
  const [wrongNoteCount, setWrongNoteCount] = useState(0);
  const [pause, setPause] = useState(true);

  const updateCorrectNotes = useCallback(() => {
    setCorrectNoteCount((c) => c + 1);
  }, [setCorrectNoteCount]);

  const updateWrongNotes = useCallback(() => {
    setWrongNoteCount((c) => c + 1);
  }, setWrongNoteCount);

  const togglePause = () => {
    setPause((p) => !p);
  };

  return (
    <>
      <div>
        Correct note Counter: {correctNoteCount}
        Wrong note Counter: {wrongNoteCount}
      </div>
      <Button onClick={togglePause}>{pause ? "Start" : "Stop"}</Button>
      <Practice
        {...props}
        onCorrect={updateCorrectNotes}
        onWrong={updateWrongNotes}
        pause={pause}
      />
    </>
  );
};

export default FreePractice;
