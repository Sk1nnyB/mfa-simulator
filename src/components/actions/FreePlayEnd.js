import React from "react";
import { useNavigate } from 'react-router-dom';
import "./FreePlayEnd.css";
import image from '../../images/celebrations.png';

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
      <div className='left-end-container'>
          <img className='image' src={image} alt='Celebration Photo' />
      </div>
      <div className='right-end-container'>
        <h2>Congratulations!!</h2>
        <p>You've successfully passed all authentication methods. Go again or go to story!</p>
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
