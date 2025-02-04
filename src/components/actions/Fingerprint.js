import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Fingerprint.css';

function Fingerprint() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');

  const [hovering, setHovering] = useState(false);
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setHovering(true);
  };

  const stopScan = () => {
    setHovering(false);
  };

  const scanComplete = () => {
    let pos = parseInt(context[context.length - 1], 16);
    const next = (parseInt(context, 16) + 1).toString(16).toUpperCase().padStart(4, '0');
    if (pos === 0) {
      navigate(`/play?context=${next}`);
    } else {
      navigate(`/play?context=${next}`, { replace: true });
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
