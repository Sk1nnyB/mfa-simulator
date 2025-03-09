import React, { useState, useEffect } from 'react';
import "./Email.css";
import freePlayUtils  from './FreePlayUtils.js';
import firebaseUtils  from '../../firebase.js';

function Email() {
  const { runCode, phone, finished } = freePlayUtils.useVariables("email_task");
  const handleNextMFA = freePlayUtils.useNextMFA("email_task");

  const [code] = useState(Math.floor(Math.random() * 9000) + 1000);
  const [inputCode, setInputCode] = useState("");

  useEffect(() => {
    firebaseUtils.updateField(runCode, "email_code", code);
  }, [runCode]);

  useEffect(() => {
    if (finished) {
      handleNextMFA();
    }
  }, [finished]);

  const handleInputChange = (input) => {
    setInputCode(input.target.value);
  };

  // Function to handle the button click
  const handleClick = () => {
    if (code === parseInt(inputCode)) {
      firebaseUtils.updateField(runCode, "email_task", "finished");
      handleNextMFA();
    } else {
      alert(`Entered Security Code: ${inputCode} is not correct! Try again.`);
    }
  };

  return (
    <div className="email-container box-border">
      <div className="security-code-container">
        <h3>Email Code</h3>
        <input
          type="text"
          id="email-code"
          placeholder="Enter Code Here!"
          value={inputCode}
          onChange={handleInputChange}
        />
        <button onClick={handleClick} className="primary-button">
          Input Code
        </button>
      </div>
      <div className="email-window">
        <div className="email-content">
          <p>Hi SampleUser!
          <br />
            <br /> We've noticed a log in attempt from: 192.168.1.1
            <br />Your code is: <span className="code">{code}</span>
            <br />Please enter this code in the next 30 minutes to log in.
            <br />
            <br />Many thanks,
            <br />The MFA Simulator</p>
        </div>
      </div>
    </div>
  );
}

export default Email;