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