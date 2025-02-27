import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FreePlayStart.css';
import firebaseUtils  from '../../firebase.js';

function FreePlayStart() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');
  const story = queryParams.get('story');
  const navigate = useNavigate();

  const handleBeginClick = async () => {
    try {
      const runCode = await firebaseUtils.generateUniqueRunCode(); // Await the result

      if (parseInt(story) === 1) {
        firebaseUtils.startStory(runCode);
        navigate(`/play?story=2&phone=0&runCode=${runCode}`);
      } else {
        firebaseUtils.startFreePlay(runCode, context);
        navigate(`/play?context=${context}&startPage=0&phone=0&runCode=${runCode}`);
      }
    } catch (error) {
      console.error("Error generating run code:", error);
    }
  };

  const handleBeginPhoneClick = async () => {
    try {
      const runCode = await firebaseUtils.generateUniqueRunCode(); // Await the result
      firebaseUtils.updateField(runCode, "phone", true);

      if (parseInt(story) === 1) {
        firebaseUtils.startStory(runCode);
        navigate(`/play?story=2&phone=1&runCode=${runCode}`);
      } else {
        firebaseUtils.startFreePlay(runCode, context);
        navigate(`/play?context=${context}&startPage=0&phone=1&runCode=${runCode}`);
      }
    } catch (error) {
      console.error("Error generating run code:", error);
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
        <div className="start-text-box box-border text-box">
          <h4>
            What is this?
          </h4>
          <p>
          <ul>
            <li>This is an educational simulator, designed to feel like logging into a web service, such as Facebook or online banking.</li>
            <li>{story
              ? ' The following authenticaiton methods are some of the most commonly used methods used on the internet.'
              : ' The following authentication methods have been pre-set by a third party.'}</li>
          </ul>
          </p>
        </div>
        <div className="start-text-box box-border text-box">
          <h4>
            What do I do?
          </h4>
          <p>
          <ul>
            <li>You will attempt to complete a series of authentication methods.</li>
            <li>Each method will have accompanying instructions should you get stuck.</li>
            <li>Read the descriptions of each method presented to find out more!</li>
            <li>You should NOT be asked to input any real life, sensitive information. If you are asked to input this, please leave the site immediately as it may be a fake website attempting to gain sensitive information.</li>
          </ul>
          </p>
        </div>
        <div className="start-text-box box-border text-box">
          <h4>
            Why am I doing this?
          </h4>
          <p>
          <ul>
            <li>This tool was designed to help you practice using several methods of authentication, as well as understand about how they work.</li>
            <li>You should also attempt to understand why each method is used, not just what to do.</li>
          </ul>
            {story
              ? ''
              : ' These methods have been specifically selected by a third party and therefore may reflect a real life system.'}
          </p>
        </div>
        <div className="start-text-box box-border text-box">
          <h4>
            I want to use the phone app!
          </h4>
          <p>
          <ul>
            <li>If you want to use the phone app, just click the button: 'Start with MFA Assistant'.</li>
            <li>For each section that requires you to use the phone app, the code will be given INSTEAD of the activity.</li>
            <li>This code will be the same on each run, so feel free to stay logged in if needed.</li>
          </ul>
            {story
              ? ''
              : ' These methods have been specifically selected by a third party and therefore may reflect a real life system.'}
          </p>
        </div>
      </div>
      <div className='buttons-container'>
        <button className="start-button primary-button" onClick={handleBeginClick}>
          Start &#8594;
        </button>

        <button className="secondary-button" onClick={handleBeginPhoneClick}>
          Start with MFA Assistant &#8594;
        </button>
      </div>
    </div>
);
};

export default FreePlayStart;