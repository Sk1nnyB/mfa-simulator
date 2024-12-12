import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Text.css";

function Text() {
  const [code] = useState(Math.floor(Math.random() * 9000) + 1000);
  const [inputCode, setInputCode] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');
  const story = queryParams.get('story');

  const handleInputChange = (input) => {
    setInputCode(input.target.value);
  };

  const handleClick = () => {
    if (code === parseInt(inputCode)) {
      if (story !== null) {
        navigate(`/play?story=4`);
      } else {
        let pos = parseInt(context[context.length - 1], 16);
        const next = (parseInt(context, 16) + 1).toString(16).toUpperCase();
        if (pos === 0) {
          navigate(`/play?context=${next}`);
        } else {
          navigate(`/play?context=${next}`, { replace: true });
        }
      }
    } else {
      alert(`Entered Security Code: ${inputCode} is not correct! Try again.`);
    }
  };

  return (
    <div className="text-container">
      <div className="text-input-container">
        <label htmlFor="security-code">Security Code</label>
        <input
          type="text"
          id="security-code"
          placeholder="Enter Code Here!"
          value={inputCode}
          onChange={handleInputChange}
        />
        <button onClick={handleClick} className="text-button">
            Input Code
        </button>
      </div>
      <div className="phone">
        <div className="phone-screen">
          <div className="sms-bubble">
            Your code is: <span className="code">{code}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Text;