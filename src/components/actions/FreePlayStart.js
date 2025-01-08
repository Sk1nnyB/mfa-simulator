import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FreePlayStart.css';

function FreePlayStart() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');
  const story = queryParams.get('story');
  const navigate = useNavigate();

  const handleBeginClick = () => {
    if ((parseInt(story) === 1)) {
      navigate(`/play?story=2`);
    } else {
      navigate(`/play?context=${context}&startPage=0`);
    }
  };

  return (
    <div className="start-container">
      <div className="start-container-text box-border">
        <h1>
        {story
            ? 'Welcome to the story mode!'
            : 'Welcome!'}
        </h1>
        <div className="start-text-box box-border">
          <h4>
            What is this?
          </h4>
          <p>
          <ul>
            <li>This is a simulator for logging into a web service, such as Facebook or online banking.</li>
            <li>{story
              ? ' The following authenticaiton methods are some of the most commonly used methods.'
              : ' The following authentication methods have been pre-set by a third party.'}</li>
          </ul>
          </p>
        </div>
        <div className="start-text-box box-border">
          <h4>
            What do I do?
          </h4>
          <p>
          <ul>
            <li>You will attempt to complete a series of authentication methods.</li>
            <li>Each method will have instructions should you get stuck.</li>
            <li>Read the descriptions of each method presented to find out more about why it is used.</li>
          </ul>
          </p>
        </div>
        <div className="start-text-box box-border">
          <h4>
            Why am I doing this?
          </h4>
          <p>
          <ul>
            <li>This is an educational tool, meant for informing users about how multi-factor authenticator methods work.</li>
            <li>You should attempt to understand why each is used, not just what to do.</li>
          </ul>
            {story
              ? ''
              : ' These methods have been specifically selected by a third party and therefore may reflect a real life system.'}
          </p>
        </div>
      </div>
      <button className="start-button primary-button" onClick={handleBeginClick}>
            Start &#8594;
        </button>
    </div>
);
};

export default FreePlayStart;