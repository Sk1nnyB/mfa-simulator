import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import freePlayUtils  from '../../hooks/freeplay/FreePlayUtils.js';
import "./Smart_Card.css";

function Smart_Card() {
  const { runCode, phone, finished } = freePlayUtils.useVariables("smart_card");
  const handleNextMFA = freePlayUtils.useNextMFA("smart_card");
  const [hasHandledMFA, setHasHandledMFA] = useState(false);

  const [progress, setProgress] = useState(0);
  const sensorRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
      if (finished && !hasHandledMFA) {
        setHasHandledMFA(true);
        handleNextMFA();
      }
    }, [finished]);

  const handleSwipe = () => {
    if (!hasHandledMFA) {
      setHasHandledMFA(true);
      handleNextMFA();
    }
  };

  const startScan = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          handleSwipe();
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const resetScan = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setProgress(0);
  };

  const handleDrag = (input) => {
    const sensor = sensorRef.current;
    if (!sensor) return;

    const sensorRect = sensor.getBoundingClientRect();
    const cardRect = input.target.getBoundingClientRect();

    const isOverlapping =
      cardRect.right > sensorRect.left &&
      cardRect.left < sensorRect.right &&
      cardRect.bottom > sensorRect.top &&
      cardRect.top < sensorRect.bottom;

    if (isOverlapping) {
      startScan();
    } else {
      resetScan();
    }
  };

  return (
    <div className="sensor-container">
      <div
        className="sensor"
        ref={sensorRef}
        data-testid="sensor"
      >
        <div
          className="green-fill"
          style={{ height: `${progress}%` }}
        ></div>
        <div className="text-overlay">
          {progress
            ? 'Scanning card... Please wait...'
            : 'Drag the card here!'}
        </div>
      </div>

      <Draggable onDrag={handleDrag}>
        <div className="draggable-card" data-testid="draggable-card"></div>
      </Draggable>
    </div>
  );
}

export default Smart_Card;
