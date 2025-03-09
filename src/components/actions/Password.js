import React, { useState, useEffect } from "react";
import { Tooltip } from 'react-tooltip';
import "./Password.css";
import freePlayUtils  from '../../hooks/freeplay/FreePlayUtils.js';

function Password() {
  const { runCode, phone, finished } = freePlayUtils.useVariables("password");
  const handleNextMFA = freePlayUtils.useNextMFA("password");
  const [hasHandledMFA, setHasHandledMFA] = useState(false);

  const [savedPassword, setSavedPassword] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState({
    length: false,
    lower: false,
    upper: false,
    number: false,
    symbol: false,
  });
  const [validPassword, setValidPassword] = useState(false);
  const username = "SampleUsername";

  useEffect(() => {
      if (finished && !hasHandledMFA) {
        setHasHandledMFA(true);
        handleNextMFA();
      }
    }, [finished]);

  const validatePassword = (input) => {
    const length = input.length >= 8 && input.length <= 14;
    const lower = /[a-z]/.test(input);
    const upper = /[A-Z]/.test(input);
    const number = /[0-9]/.test(input);
    const symbol = /[!@#$%^&*(),.?":{}|<>;'\[\]=\-~_+£\/\\`¬]/.test(input);

    setPasswordStatus({ length, lower, upper, number, symbol });
    length && lower && upper && number && symbol ?  setValidPassword(true) : setValidPassword(false);
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

    if (!validPassword) {
      alert('Password is not strong enough.');
      return;
    }

    if (savedPassword === inputPassword && !hasHandledMFA) {
      setHasHandledMFA(true);
      handleNextMFA();
    } else {
      alert(`Entered Password: ${inputPassword} is not correct! Try again.`);
    }
  };

  return (
    <div className="password-container">
      <div className="password-section" style={{
        backgroundColor: validPassword ? "#dbdfe2" : "#b1e9fa",
      }}>
        <a
          data-tooltip-id="password-tooltip"
          data-tooltip-html="<p>A strong password needs:</p>
                            <ul>
                              <li>A number</li>
                              <li>A symbol</li>
                              <li>An uppercase and lowercase letter</li>
                              <li>A length between 8 and 14</li>
                            </ul>"
          data-tooltip-place="top"
          className="tooltip-circle tooltip-circle-password"
        > ? </a>
        <Tooltip id="password-tooltip"/>
        <h2> Step 1: Create the password </h2>
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
      <div className="login-section" style={{
        backgroundColor: validPassword ? "#b1e9fa" : "#dbdfe2",
      }}>
        <h2> Step 2: Log in </h2>
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
        <button type="submit" className="login-button primary-button" onClick={handleInputClick}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Password;
