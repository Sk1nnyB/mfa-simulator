import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const handleStoryClick = () => {
    navigate(`/play?story=true`);
  };

  const handleFreeplayClick = () => {
    navigate(`/freeplay`);
  };

  return (
    <div className='home-container'>
      <div className='box-border home-mid-section'>
        <h1>
          The MFA Simulator
        </h1>
        <p>Learn all about different authentication methods in the Library, then try them yourself in the Story Mode or make your own log in system in Freeplay!</p>
        <div className='home-btns'>
          <button className="primary-button" onClick={handleStoryClick}>
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
