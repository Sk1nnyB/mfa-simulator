import React, { useState } from "react";
import "./FreePlay.css";
import { optionsMFA } from '../../data/options_mfa';
import { useNavigate } from 'react-router-dom';

function FreePlay() {
  const defaultLinkStub = "https://sk1nnyb.github.io/mfa-simulator/#/";
  const defaultLink = defaultLinkStub + "FreePlay";
  const [options, setOptions] = useState(Array(optionsMFA.length).fill(false));
  const [setupLink, setSetupLink] = useState(defaultLink);
  const [playcode, setPlaycode] = useState(0);
  const navigate = useNavigate();

  const toggleOption = (index) => {
    setOptions((prevOptions) => {
      const newOptions = prevOptions.map((option, i) => (i === index ? !option : option));
      let option = newOptions[index];
      let value = 2 ** (12 - (index + 1));

      setPlaycode((prevPlaycode) => {
        const newPlaycode = option ? prevPlaycode + value : prevPlaycode - value;

        if (newPlaycode === 0) {
          setSetupLink(defaultLink);
        } else {
          let hexPlaycode = (newPlaycode * 16).toString(16);
          hexPlaycode = hexPlaycode.padStart(4, '0');
          setSetupLink(defaultLinkStub+"play?context="+hexPlaycode+"&startPage=1");
        }

        return newPlaycode;
      });

      return newOptions;
    });
  };

  const handleStartClick = () => {
    let hexPlaycode = (playcode * 16).toString(16);
    hexPlaycode = hexPlaycode.padStart(4, '0');
    navigate(`/play?context=${hexPlaycode}&startPage=0`);
  };

  const resetOptions = () => {
    setOptions(Array(optionsMFA.length).fill(false));
    setSetupLink(defaultLink);
  };

  return (
    <div className="freeplay">
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
        <div className="instructions-container">
          <h2>What to do?</h2>
          <p>Choose your options<br />
          If you don't like them, reset<br />
          Then click start<br />
          We'll do it no sweat!</p>
        </div>
        <div className="buttons-container">
          <button onClick={handleStartClick} disabled={playcode === 0} className="start-button">
            Start!
          </button>
          <button onClick={resetOptions} className="reset-button">
            Reset
          </button>
        </div>
          <h3>Here's the link to your setup:</h3>
          <textarea
            readOnly
            className="setup-link"
            value={setupLink}
          />
        </div>
    </div>
  );
}

export default FreePlay;

