import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Email.css";

function Email() {
  const [code] = useState(Math.floor(Math.random() * 9000) + 1000);
  const [inputCode, setInputCode] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');

  const handleInputChange = (input) => {
    setInputCode(input.target.value);
  };

  // Function to handle the button click
  const handleClick = () => {
    if (code === parseInt(inputCode)) {
      let pos = parseInt(context[context.length - 1], 16);
      const next = (parseInt(context, 16) + 1).toString(16).toUpperCase().padStart(4, '0');
      if (pos === 0) {
        navigate(`/play?context=${next}`);
      } else {
        navigate(`/play?context=${next}`, { replace: true });
      }
    } else {
      alert(`Entered Security Code: ${inputCode} is not correct! Try again.`);
    }
  };

  return (
    <div className="email-container">
      <div className="security-code">
        <label htmlFor="code-input">Security Code</label>
        <input
          type="text"
          id="email-code"
          placeholder="Enter Code Here!"
          value={inputCode}
          onChange={handleInputChange}
        />
        <button onClick={handleClick} className="text-button">
          Input Code
        </button>
      </div>
      <div className="email-window">
        <div className="email-header">
          <span>ManchesterMail</span>
          <button className="close-btn">×</button>
        </div>
        <div className="email-content">
          <img src="email.png" alt="Email PNG" />
          <p>Your code is: <span className="code">{code}</span></p>
        </div>
      </div>
    </div>
  );
}

export default Email;