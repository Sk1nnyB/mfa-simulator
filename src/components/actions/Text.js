import React, { useState, useEffect } from 'react';
import freePlayUtils  from '../../hooks/freeplay/FreePlayUtils.js';
import firebaseUtils  from '../../firebase.js';
import "./Text.css";

function Text() {
  const { runCode, phone, finished } = freePlayUtils.useVariables("text_task");
  const handleNextMFA = freePlayUtils.useNextMFA("text_task");
  const [hasHandledMFA, setHasHandledMFA] = useState(false);

  const [code, setCode] = useState(null);
  const [inputCode, setInputCode] = useState("");

  useEffect(() => {
    const fetchCode = async () => {
      const firebaseCode = await firebaseUtils.getField(runCode, "text_code");
      const generatedCode = firebaseCode ?? Math.floor(Math.random() * 9000) + 1000;
      setCode(generatedCode);

      await Promise.all([
        firebaseUtils.setField(runCode, "text_code", generatedCode),
      ]);
    };

    if (runCode) {
      fetchCode().catch((error) => console.error("Error fetching/updating fields:", error));
    }
  }, [runCode]);


  useEffect(() => {
      if (finished && !hasHandledMFA) {
        setHasHandledMFA(true);
        handleNextMFA();
      }
    }, [finished]);

  const handleInputChange = (input) => {
    setInputCode(input.target.value);
  };

  const handleClick = () => {
    if (code === parseInt(inputCode) && !hasHandledMFA) {
      setHasHandledMFA(true);
      handleNextMFA();
    } else {
      alert(`Entered Security Code: ${inputCode} is not correct! Try again.`);
    }
  };

  return (
    <div className="text-container generic-action-container box-border">
      <div className="text-input-container">
        <label htmlFor="security-code">Security Code</label>
        <input
          type="text"
          id="security-code"
          placeholder="Enter Code Here!"
          value={inputCode}
          onChange={handleInputChange}
        />
        <button onClick={handleClick} className="text-button primary-button">
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