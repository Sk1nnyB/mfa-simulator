import React, { useState, useEffect } from 'react';
import useNextMFA from './FreePlayNext.js';
import './Fingerprint.css';

function Fingerprint() {
  const [hovering, setHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const handleNextMFA = useNextMFA();

  const startScan = () => {
    setHovering(true);
  };

  const stopScan = () => {
    setHovering(false);
  };

  const scanComplete = () => {
    handleNextMFA();
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
