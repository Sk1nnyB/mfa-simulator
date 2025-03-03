import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useNextMFA from './FreePlayNext.js';
import "./Text.css";
import firebaseUtils  from '../../firebase.js';

function Text() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const runCode = queryParams.get('runCode');
  const finished = firebaseUtils.useWaitForFinished(runCode, "text_task");

  const [code] = useState(Math.floor(Math.random() * 9000) + 1000);
  const [inputCode, setInputCode] = useState("");
  const handleNextMFA = useNextMFA();

  useEffect(() => {
    firebaseUtils.updateField(runCode, "text_task", "started");
    firebaseUtils.updateField(runCode, "text_code", code);
    firebaseUtils.updateField(runCode, "status", "active");
  }, [runCode]);

  useEffect(() => {
    if (finished) {
      handleNextMFA();
    }
  }, [finished]);

  const handleInputChange = (input) => {
    setInputCode(input.target.value);
  };

  const handleClick = () => {
    if (code === parseInt(inputCode)) {
      firebaseUtils.updateField(runCode, "text_task", "finished");
      handleNextMFA();
    } else {
      alert(`Entered Security Code: ${inputCode} is not correct! Try again.`);
    }
  };

  return (
    <div className="text-container box-border">
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
      <div className="phone phone-text">
        <div className="phone-screen-text">
          <div className="sms-bubble">
            Hey! We've noticed you've attempted to log into your Manchester Email!
          </div>
          <div className="sms-bubble">
            Your code is: <span className="code">{code}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Text;