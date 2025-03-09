import React, { useState, useEffect } from 'react';
import './Fingerprint.css';
import freePlayUtils  from '../../hooks/freeplay/FreePlayUtils.js';

function Fingerprint() {
  const { runCode, phone, finished } = freePlayUtils.useVariables("fingerprint");
  const handleNextMFA = freePlayUtils.useNextMFA("fingerprint");
  const [hasHandledMFA, setHasHandledMFA] = useState(false);

  const [hovering, setHovering] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
      if (finished && !hasHandledMFA) {
        setHasHandledMFA(true);
        handleNextMFA();
      }
    }, [finished]);

  const startScan = () => {
    setHovering(true);
  };

  const stopScan = () => {
    setHovering(false);
  };

  const scanComplete = () => {
    if (!hasHandledMFA) {
      setHasHandledMFA(true);
      handleNextMFA();
    }
  };

  useEffect(() => {
    let interval;
    if (hovering) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            scanComplete();
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [hovering]);

  return (
    <div className="fingerprint-container">
      <div
        className="scan-container"
        onMouseEnter={startScan}
        onMouseLeave={stopScan}
      >
        <div
          className="green-fill"
          style={{ height: `${progress}%` }}
        ></div>
        <div className="text-overlay">
          {hovering
            ? 'Scanning "finger"... Please wait...'
            : 'Place your "finger" here!'}
        </div>
      </div>
    </div>
  );
}

export default Fingerprint;
