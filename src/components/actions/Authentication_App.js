import React from 'react';
import useNextMFA from './FreePlayNext.js';
import "./Authentication_App.css";

function Authentication_App() {
  const handleNextMFA = useNextMFA();

  return (
    <div className="authentication-app-container box-border">
      <div className="phone phone-authenticator">
        <div className="phone-screen">
          <div className="aa-notification">
            Log in detected! Are you trying to log in?
          </div>
          <button onClick={handleNextMFA} className="primary-button aa-button">
              Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authentication_App;