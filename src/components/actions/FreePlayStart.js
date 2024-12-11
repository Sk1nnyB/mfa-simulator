import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FreePlayStart.css';

function FreePlayStart() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');
  const navigate = useNavigate();

  const handleBeginClick = () => {
    navigate(`/play?context=${context}&startPage=0`);
  };

  return (
    <div className="start-container">
        <h1>Start your journey!</h1>
        <p> Description of what will happen and why they're here.</p>
        <button className="start-button" onClick={handleBeginClick}>
            Start &#8594;
        </button>
    </div>
);
};

export default FreePlayStart;