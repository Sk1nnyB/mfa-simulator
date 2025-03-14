import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import ConfettiComponent from "../../hooks/confetti/confetti.jsx";
import firebaseUtils  from '../../firebase.js';
import "./FreePlayEnd.css";

function FreePlayEnd() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const runCode = queryParams.get('runCode');

  const updateEndForm = async (runCode) => {
    await firebaseUtils.endRun(runCode);
  };

  const handleGoClick = () => {
    navigate(`/freeplay`);
  };

  const handleStoryClick = () => {
    navigate(`/play?story=true`);
  };

  updateEndForm(runCode);

  return (
    <div className='endscreen'>
      <div className='end-container box-border'>
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

