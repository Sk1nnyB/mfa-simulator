import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./Password.css"; // Import a CSS file for styling

function Password() {
  const [savedPassword, setSavedPassword] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState({
    length: false,
    lower: false,
    upper: false,
    number: false,
    symbol: false,
  });
  const username = "SampleUsername";

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');
  const story = queryParams.get('story');

  const validatePassword = (input) => {
    const length = input.length >= 8 && input.length <= 14;
    const lower = /[a-z]/.test(input);
    const upper = /[A-Z]/.test(input);
    const number = /[0-9]/.test(input);
    const symbol = /[!@#$%^&*(),.?":{}|<>]/.test(input);

    setPasswordStatus({ length, lower, upper, number, symbol });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    validatePassword(value);
    setSavedPassword(value)
  };

  const handleInputClick = () => {
    if (!savedPassword || !inputPassword) {
      alert('No password given.');
      return;
    }

    if (savedPassword === inputPassword) {
      if (story !== null) {
        navigate(`/play?story=3`);
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
      alert(`Entered Password: ${inputPassword} is not correct! Try again.`);
    }
  };
  return (
    <div className="container">
      <div className="password-section">
        <label>Password</label>
        <input
          type="text"
          placeholder="Enter Here!"
          value={savedPassword}
          onChange={handlePasswordChange}
          autoComplete="new-password"
        />
        <div className="password-validation">
          <span
            className={`validation ${passwordStatus.lower ? "valid" : "invalid"}`}
          >
            Lower Case
          </span>
          <span
            className={`validation ${passwordStatus.upper ? "valid" : "invalid"}`}
          >
            Upper Case
          </span>
          <span
            className={`validation ${passwordStatus.number ? "valid" : "invalid"}`}
          >
            Number
          </span>
          <span
            className={`validation ${passwordStatus.symbol ? "valid" : "invalid"}`}
          >
            Symbol
          </span>
          <span
            className={`validation ${passwordStatus.length ? "valid" : "invalid"}`}
          >
            Length
          </span>
        </div>
      </div>
      <div className="login-section">
        <label>Username</label>
        <input
          type="text"
          value={username}
          readOnly
        />
        <label>Password</label>
        <input type="Password"
        placeholder="Enter Here!"
        onChange={(e) => setInputPassword(e.target.value)}
        autoComplete="new-password"/>
        <button type="submit" className="login-button" onClick={handleInputClick}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Password;
