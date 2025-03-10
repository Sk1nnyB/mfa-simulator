import React from "react";
import phone_assistant_app from '../../data/images/phone-assistant-app.png';
import './MFA_Assistant.css';

function MFA_Assistant() {

  return (
    <div className='mfa-assistant-container'>
      <div className='box-border assistant-content'>
        <div className="assistant-text-container">
          <h2>The MFA Assistant!</h2>
          <p>The MFA Assistant is an app that allows you to follow along with a Story Mode or Free Play simulation in real time!</p>
          <p>Just click the button below to download the app to your phone and follow the instructions there.</p>
          <a href="../../../public/data/MFA-Assistant.apk" download="MFA_Assistant.apk">
            <button className='primary-button assistant-download-button'>
              Download (for Android)
            </button>
          </a>
        </div>
        <div className="assistant-image-container">
          <img className="assistant-image" src={phone_assistant_app} alt='Image of MFA Assistant' />
        </div>
      </div>
    </div>
  );
};

export default MFA_Assistant;
