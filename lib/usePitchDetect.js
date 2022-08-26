import { useState, useEffect, useCallback } from "react";
import useAveragedState from "./useAveragedState";
import autoCorrelate from "./AutoCorrelate";
import AudioContext from "./contexts/AudioContext";

const audioCtx = AudioContext.getAudioContext();
const analyserNode = AudioContext.getAnalyser();
const buflen = 2048;
var buf = new Float32Array(buflen);

const usePitchDetect = () => {
  const [source, setSource] = useState(null);
  const [started, setStart] = useState(false);
  const [pitch, setPitch, clearPitch] = useAveragedState(0, 50); // pitch in hertz

  const updatePitch = useCallback(() => {
    analyserNode.getFloatTimeDomainData(buf);
    var ac = autoCorrelate(buf, audioCtx.sampleRate);
    if (ac > -1) {
      if (ac !== pitch) {
        clearPitch();
      }
      setPitch(ac);
    } else if (pitch > 0) {
      clearPitch();
    }
  }, [setPitch, clearPitch]);

  useEffect(() => {
    if (source != null) {
      source.connect(analyserNode);
    }
  }, [source]);

  useEffect(() => {
    const timerId = setInterval(updatePitch, 1);
    return () => clearInterval(timerId);
  }, [updatePitch]);

  const start = async () => {
    const input = await getMicInput();

    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }
    setStart(true);
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

  return { pitch, started, start };
};

export default usePitchDetect;
