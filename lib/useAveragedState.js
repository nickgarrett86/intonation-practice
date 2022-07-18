import { useState, useEffect } from "react";

const useAveragedState = (initialValue, windowSize) => {
  const [window, setWindow] = useState(Array(windowSize).fill(initialValue));
  const [newValue, setNewValue] = useState(null);

  const updateWindow = (nv) => {
    setNewValue(nv);
  };

  const clearWindow = () => {
    setWindow(Array(windowSize).fill(initialValue));
  };

  useEffect(() => {
    if (newValue !== null) {
      let newWindow = [...window];
      newWindow.shift();
      newWindow.push(newValue);
      setWindow(newWindow);
      setNewValue(null);
    }
  }, [newValue, setNewValue, window, setWindow]);

  const sum = window.reduce((a, b) => a + b, 0);

  return [
    sum > 0 ? parseFloat(sum / windowSize) : 0,
    updateWindow,
    clearWindow,
  ];
};

export default useAveragedState;
