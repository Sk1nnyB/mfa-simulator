import React, { useState } from "react";
import "./Sandbox.css";
import { optionsMFA } from '../../data/options_mfa';
import { useNavigate } from 'react-router-dom';

function Sandbox() {
  const [options, setOptions] = useState(Array(optionsMFA.length).fill(false));
  const [setupLink, setSetupLink] = useState("Here's the link to your setup: ...");
  const [playcode, setPlaycode] = useState(0);
  const navigate = useNavigate();

  const toggleOption = (index) => {
    setOptions((prevOptions) => {
      const newOptions = prevOptions.map((option, i) => (i === index ? !option : option));
      let option = newOptions[index];
      let value = 2 ** (12 - (index + 1));

      if (option) {
        setPlaycode((prevPlaycode) => prevPlaycode + value);
      } else {
        setPlaycode((prevPlaycode) => prevPlaycode - value);
      }

      return newOptions;
    });
  };

  const handleStartClick = () => {
    let hexPlaycode = (playcode * 16).toString(16);
    hexPlaycode = hexPlaycode.padStart(4, '0');
    navigate(`/play?context=${hexPlaycode}`);
  };

  const resetOptions = () => {
    setOptions(Array(optionsMFA.length).fill(false));
    setSetupLink("Here's the link to your setup: ...");
  };

  return (
    <div className="sandbox">
      <div className="left-container">
        {optionsMFA.map((option, index) => (
          <div key={index} className="option">
            <label className="switch">
              <input
                type="checkbox"
                checked={options[index]}
                onChange={() => toggleOption(index)}
              />
              <span className="slider"></span>
            </label>
            <span>{option.name}</span>
          </div>
        ))}
      </div>
      <div className="right-container">
      <div className="buttons-container">
        <button onClick={handleStartClick} className="start-button">
          Start!
        </button>
        <button onClick={resetOptions} className="reset-button">
          Reset
        </button>
      </div>
        <textarea
          readOnly
          className="setup-link"
          value={setupLink}
        />
      </div>
    </div>
  );
}

export default Sandbox;

