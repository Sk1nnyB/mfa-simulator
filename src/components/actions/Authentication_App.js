import React from 'react';
import { useLocation } from 'react-router-dom';
import useNextMFA from './FreePlayNext.js';
import "./Authentication_App.css";
import firebaseUtils  from '../../firebase.js';

function Authentication_App() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const runCode = queryParams.get('runCode');

  firebaseUtils.updateField(runCode, "authentication_app", "started");

  const handleNextMFA = useNextMFA();
  const handleAuthAppClick = () => {
    firebaseUtils.updateField(runCode, "authentication_app", "finished");
    handleNextMFA();
  };

  return (
    <div className="authentication-app-container box-border">
      <div className="phone phone-authenticator">
        <div className="phone-screen">
          <div className="aa-notification">
            Log in detected! Are you trying to log in?
          </div>
          <button onClick={handleAuthAppClick} className="primary-button aa-button">
              Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authentication_App;