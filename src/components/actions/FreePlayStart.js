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
        <h1>
        {story
            ? 'Welcome to the story mode!'
            : 'Welcome!'}
        </h1>
        <div className="start-text-box">
          <h4>
            What is this?
          </h4>
          <p>
            This is a simulator for logging into a web service, such as Facebook or online banking.
            {story
              ? ' The following authenticaiton methods are some of the most common methods of making sure a user \
              is who they claim they are.'
              : ' The following authentication methods have been pre-set by whoever made this link.'}
          </p>
        </div>
        <div className="start-text-box">
          <h4>
            What do I do?
          </h4>
          <p>
            You will attempt to comlete a series of authentication methods in order to successfully log in.
            Each method will have instructions should you get stuck.
          </p>
        </div>
        <div className="start-text-box">
          <h4>
            Why am I doing this?
          </h4>
          <p>
            This is an educational tool; although you may not actually be logging into
            a particular service, you should still attempt to understand what you are doing and why.
            {story
              ? ''
              : ' These methods have been specifically selected by a third party and may reflect a real life system.'}
          </p>
        </div>
        <button className="start-button" onClick={handleBeginClick}>
            Start &#8594;
        </button>
    </div>
);
};

export default FreePlayStart;