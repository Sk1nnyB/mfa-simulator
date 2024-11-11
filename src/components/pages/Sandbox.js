import React, { useState } from "react";
import "./Sandbox.css";
import { optionsMFA } from '../../data/options_mfa';

function Sandbox() {
  const [options, setOptions] = useState(Array(optionsMFA.length).fill(false));
  const [setupLink, setSetupLink] = useState("Here's the link to your setup: ...");

  const toggleOption = (index) => {
    setOptions((prevOptions) =>
      prevOptions.map((option, i) => (i === index ? !option : option))
    );
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
        <button onClick={() => alert("Start clicked!")} className="start-button">
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

