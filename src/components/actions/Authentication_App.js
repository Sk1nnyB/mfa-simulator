import React, { useEffect, useState } from 'react';
import freePlayUtils  from '../../hooks/freeplay/FreePlayUtils.js';
import "./Authentication_App.css";

function Authentication_App() {
  const { runCode, phone, finished } = freePlayUtils.useVariables("authentication_app");
  const handleNextMFA = freePlayUtils.useNextMFA("authentication_app");
  const [hasHandledMFA, setHasHandledMFA] = useState(false);

  useEffect(() => {
    if (finished && !hasHandledMFA) {
      setHasHandledMFA(true);
      handleNextMFA();
    }
  }, [finished]);

  const handleAuthAppClick = () => {
    if (!hasHandledMFA) {
      setHasHandledMFA(true);
      handleNextMFA();
    }
  };

  if (phone) {
    return <div className="phone-code-section box-border">Go to your mobile device now! <br/> Run Code: <span className="code">{runCode}</span></div>;
  }

  return (
    <div className="authentication-app-container generic-action-container">
      <div className="phone phone-authenticator">
        <div className="phone-screen">
          <div className="aa-notification">
            Log in detected! Are you trying to log in?
          </div>
          <button onClick={handleAuthAppClick} className="aa-button primary-button">
              Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authentication_App;