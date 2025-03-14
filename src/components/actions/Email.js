import React, { useState, useEffect } from 'react';
import freePlayUtils  from '../../hooks/freeplay/FreePlayUtils.js';
import firebaseUtils  from '../../firebase.js';
import "./Email.css";

function Email() {
  const { runCode, phone, finished } = freePlayUtils.useVariables("email_task");
  const handleNextMFA = freePlayUtils.useNextMFA("email_task");
  const [hasHandledMFA, setHasHandledMFA] = useState(false);

  const [code, setCode] = useState(null);
  const [inputCode, setInputCode] = useState("");

  useEffect(() => {
    if (finished && !hasHandledMFA) {
      setHasHandledMFA(true);
      handleNextMFA();
    }
  }, [finished]);

  useEffect(() => {
      const fetchCode = async () => {
        const firebaseCode = await firebaseUtils.getField(runCode, "email_code");
        const generatedCode = firebaseCode ?? Math.floor(Math.random() * 9000) + 1000;

        setCode(generatedCode);

        await Promise.all([
          firebaseUtils.setField(runCode, "email_code", generatedCode),
        ]);
      };

      if (runCode) {
        fetchCode().catch((error) => console.error("Error fetching/updating email code:", error));
      }
    }, [runCode]);

  const handleInputChange = (input) => {
    setInputCode(input.target.value);
  };

  const handleEmailClick = () => {
    if (code === parseInt(inputCode) && !hasHandledMFA) {
        setHasHandledMFA(true);
        handleNextMFA();
    } else {
      alert(`Entered Security Code: ${inputCode} is not correct! Try again.`);
    }
  };

  return (
    <div className="email-container generic-action-container box-border">
      <div className="security-code-container">
        <h3>Email Code</h3>
        <input
          type="text"
          id="email-code"
          placeholder="Enter Code Here!"
          value={inputCode}
          onChange={handleInputChange}
        />
        <button onClick={handleEmailClick} className="primary-button">
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