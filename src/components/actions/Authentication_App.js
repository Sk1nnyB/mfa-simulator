import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Authentication_App.css";

function Authentication_App() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');

  const handleClick = () => {
    let pos = parseInt(context[context.length - 1], 16);
    const next = (parseInt(context, 16) + 1).toString(16).toUpperCase().padStart(4, '0');
    if (pos === 0) {
      navigate(`/play?context=${next}`);
    } else {
      navigate(`/play?context=${next}`, { replace: true });
    }
  };

  return (
    <div className="authentication-app-container">
      <div className="phone">
        <div className="phone-screen">
          <div className="sms-bubble">
            Log in detected! Are you trying to log in?
          </div>
          <button onClick={handleClick} className="aa-button">
              Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authentication_App;