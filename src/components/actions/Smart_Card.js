import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import "./Smart_Card.css";

function Smart_Card() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get("context");
  const story = queryParams.get("story");

  const [progress, setProgress] = useState(0); // Sensor fill progress
  const sensorRef = useRef(null); // Reference to the sensor
  const intervalRef = useRef(null); // To manage the progress interval

  const handleSwipe = () => {
    if (story !== null) {
      navigate(`/play?story=5`);
    } else {
      let pos = parseInt(context[context.length - 1], 16);
      const next = (parseInt(context, 16) + 1)
        .toString(16)
        .toUpperCase()
        .padStart(4, "0");
      if (pos === 0) {
        navigate(`/play?context=${next}`);
      } else {
        navigate(`/play?context=${next}`, { replace: true });
      }
    }
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

    // Check if card is overlapping the sensor
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
        <div className="draggable-card">Security Card</div>
      </Draggable>
    </div>
  );
}

export default Smart_Card;
