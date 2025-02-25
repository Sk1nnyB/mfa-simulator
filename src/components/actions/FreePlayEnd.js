import React from "react";
import { useNavigate } from 'react-router-dom';
import "./FreePlayEnd.css";
import finish from '../../images/finish.jpg';
import ConfettiComponent from "../../hooks/confetti/confetti.jsx";

function FreePlayEnd() {
  const navigate = useNavigate();

  const handleGoClick = () => {
    navigate(`/freeplay`);
  };

  const handleStoryClick = () => {
    navigate(`/play?story=1`);
  };

  return (
    <div className='endscreen'>
      <div className='end-container'>
        <h2 className='freeplay-end-h2'>Congratulations!!</h2>
        <ConfettiComponent />
        <p className='freeplay-end-p'>You've successfully passed all selected authentication methods. Go again or go to story!</p>
        <div className='end-buttons'>
            <button className='go-button primary-button' onClick={handleGoClick}>
                Freeplay &#8594;
            </button>
            <button className='story-button secondary-button' onClick={handleStoryClick}>
                Story
            </button>
        </div>
      </div>
    </div>
  );
};

export default FreePlayEnd;

