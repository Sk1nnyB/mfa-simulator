import React, { useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import Draggable from "react-draggable";
import useNextMFA from './FreePlayNext.js';
import "./Smart_Card.css";
import firebaseUtils  from '../../firebase.js';

function Smart_Card() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const runCode = queryParams.get('runCode');

  const [progress, setProgress] = useState(0); // Sensor fill progress
  const sensorRef = useRef(null); // Reference to the sensor
  const intervalRef = useRef(null); // To manage the progress interval
  const handleNextMFA = useNextMFA();

  const handleSwipe = () => {
    firebaseUtils.updateField(runCode, "smart_card", "finished");
    handleNextMFA();
  };

  const startProgress = () => {
    if (intervalRef.current) return; // Prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          handleSwipe(); // Trigger function when sensor fills
          return 100;
        }
        return prev + 5; // Increment progress every 100ms (fills in ~5 seconds)
      });
    }, 100);
  };

  const resetProgress = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setProgress(0);
  };

  const handleDrag = (e, data) => {
    const sensor = sensorRef.current;
    if (!sensor) return;

    const sensorRect = sensor.getBoundingClientRect();
    const cardRect = e.target.getBoundingClientRect();

    const isOverlapping =
      cardRect.right > sensorRect.left &&
      cardRect.left < sensorRect.right &&
      cardRect.bottom > sensorRect.top &&
      cardRect.top < sensorRect.bottom;

    if (isOverlapping) {
      startProgress();
    } else {
      resetProgress();
    }
  };

  return (
    <div className="swipe-container">
      <div
        className="sensor"
        ref={sensorRef}
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
        <div className="draggable-card"></div>
      </Draggable>
    </div>
  );
}

export default Smart_Card;
