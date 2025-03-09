import React, { useEffect } from 'react';
import "./Authentication_App.css";
import freePlayUtils  from './FreePlayUtils.js';
import firebaseUtils  from '../../firebase.js';

function Authentication_App() {
  const { runCode, phone, finished } = freePlayUtils.useVariables("authentication_app");
  const handleNextMFA = freePlayUtils.useNextMFA("authentication_app");

  useEffect(() => {
    if (finished) {
      handleNextMFA();
    }
  }, [finished]);

  const handleAuthAppClick = () => {
    firebaseUtils.updateField(runCode, "authentication_app", "finished");
    handleNextMFA();
  };

  if (phone) {
    return <div className="phone-code-section box-border">Go to your mobile device now! <br/> Run Code: <span className="code">{runCode}</span></div>;
  }

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