import React, { useState, useEffect } from 'react';
import "./Text.css";
import freePlayUtils  from './FreePlayUtils.js';
import firebaseUtils  from '../../firebase.js';

function Text() {
  const { runCode, phone, finished } = freePlayUtils.useVariables("text_task");
  const handleNextMFA = freePlayUtils.useNextMFA();

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

  const [code] = useState(Math.floor(Math.random() * 9000) + 1000);
  const [inputCode, setInputCode] = useState("");

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
      {phone ? <div className="phone-code-section box-border">Go to your mobile device now! <br/> Run Code: <span className="code">{runCode}</span></div> :
      <div className="phone phone-text">
        <div className="phone-screen-text">
          <div className="sms-bubble">
            Hey! We've noticed you've attempted to log into your Manchester Email!
          </div>
          <div className="sms-bubble">
            Your code is: <span className="code">{code}</span>
          </div>
        </div>
      </div> }
    </div>
  );
}

export default Text;