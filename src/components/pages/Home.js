import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const handleStoryClick = () => {
    navigate(`/play?story=1`);
  };

  const handleFreeplayClick = () => {
    navigate(`/freeplay`);
  };

  return (
    <div className='home-container'>
      <div className='home-mid-section'>
        <h1>
          The MFA Simulator
        </h1>
        <p>Description of MFA, brief and simple on why it has come to be and how it works.</p>
        <div className='home-btns'>
          <button className="start-button primary-button" onClick={handleStoryClick}>
            Try Story Mode &#8594;
          </button>
          <button className='secondary-button freeplay-button' onClick={handleFreeplayClick}>
            Freeplay
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;