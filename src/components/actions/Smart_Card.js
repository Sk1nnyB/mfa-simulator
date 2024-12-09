import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Smart_Card.css';

function Smart_Card() {
  const [isOverlapping, setIsOverlapping] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');
  let pos = parseInt(context[context.length - 1], 16);

  const handleSwipe = () => {
    const next = (parseInt(context, 16) + 1).toString(16).toUpperCase();
    if (pos === 0) {
      navigate(`/play?context=${next}`);
    } else {
      navigate(`/play?context=${next}`, { replace: true });
    }
  };

  const handleDragStart = (e) => {
    // Prevent the translucent ghost image
    const dragImage = document.createElement('div');
    dragImage.style.width = '0px';
    dragImage.style.height = '0px';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow dropping
    const sensor = document.getElementById('sensor');
    const sensorRect = sensor.getBoundingClientRect();
    const cardRect = e.target.getBoundingClientRect();

    // Check if the dragged card overlaps the sensor
    const isOverlapping =
      cardRect.left < sensorRect.right &&
      cardRect.right > sensorRect.left &&
      cardRect.top < sensorRect.bottom &&
      cardRect.bottom > sensorRect.top;

    setIsOverlapping(isOverlapping);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isOverlapping) {
      handleSwipe(); // Trigger swipe if overlapping
    } else {
      alert('The card is not over the sensor. Try again.');
    }
    setIsOverlapping(false); // Reset state
  };

  return (
    <div className="swipe-container">
      {/* Static Sensor */}
      <div
        id="sensor"
        className="sensor"
        style={{
          width: '150px',
          height: '150px',
          backgroundColor: isOverlapping ? '#d4edda' : '#f8f9fa',
          border: '2px solid #ccc',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src="/path-to-sensor.png" alt="Sensor" style={{ width: '80px' }} />
        <p>Sensor PNG</p>
      </div>

      {/* Draggable Card */}
      <div
        draggable
        id="card"
        className="card"
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#e0e0e0',
          border: '2px solid #aaa',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
        }}
      >
        <img src="../../../images/access_card.png" alt="Card" style={{ width: '60px' }} />
        <p>Smart Card PNG</p>
      </div>
    </div>
  );
}

export default Smart_Card;
