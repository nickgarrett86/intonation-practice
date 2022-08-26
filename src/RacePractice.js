import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Button from "react-bootstrap/Button";
import Practice from "./Practice";

const correctGoal = 10;
const timeInterval = 100; // ms

const RacePractice = (props) => {
  const [correctNoteCount, setCorrectNoteCount] = useState(0);
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);
  const timer = useRef();

  const updateCorrectNotes = useCallback(() => {
    setCorrectNoteCount((c) => c + 1);
  }, [setCorrectNoteCount]);

  const restart = () => {
    setStart(true);
    setTime(0);
    setCorrectNoteCount(0);
  };

  const completed = useMemo(
    () => correctNoteCount >= correctGoal,
    [correctNoteCount]
  );

  useEffect(() => {
    if (completed) {
      clearInterval(timer.current);
      timer.current = null;
      setStart(false);
    }
  }, [completed, timer]);

  // Start timer on start
  useEffect(() => {
    if (start) {
      const updateTimer = () => {
        setTime((c) => c + timeInterval);
      };
      const t = setInterval(() => updateTimer(), timeInterval);
      timer.current = t;
      () => clearInterval(t);
    }
  }, [start]);

  return (
    <>
      <p>Time: {time / 1000}</p>
      <div>Correct notes : {correctNoteCount}</div>
      <Practice
        {...props}
        badTimeToNext={timeInterval * 100_000}
        onCorrect={updateCorrectNotes}
        pause={completed}
      />
      {!start && <Button onClick={() => restart()}>Start</Button>}
    </>
  );
};

export default RacePractice;
