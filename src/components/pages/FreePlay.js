import React, { useState } from "react";
import "./FreePlay.css";
import { optionsMFA } from '../../data/options_mfa';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'

function FreePlay() {
  const defaultLinkStub = "https://sk1nnyb.github.io/mfa-simulator/#/";
  const defaultLink = defaultLinkStub + "FreePlay";
  const [options, setOptions] = useState(Array(optionsMFA.length).fill(false));
  const [setupLink, setSetupLink] = useState(defaultLink);
  const [playcode, setPlaycode] = useState(0);
  const [authenticationLevel, setAuthenticationLevel] = useState(0);
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
          setAuthenticationLevel(0);
        } else {
          let hexPlaycode = (newPlaycode * 16).toString(16);
          hexPlaycode = hexPlaycode.padStart(4, '0');
          setSetupLink(defaultLinkStub+"play?context="+hexPlaycode+"&startPage=1");

          // [Password(0), Sec Ques(1), Auth App(2), Text(3), Email(4), Fingerprint(5), Smart Card(6), Voice(7)]
          let categories = 0;
          if (newOptions[0]) {
            categories += 1;
          }
          if (newOptions[2] || newOptions[3] || newOptions[4] || newOptions[6]) {
            categories += 1;
          }
          if (newOptions[5] || newOptions[7]) {
            categories += 1;
          }
          setAuthenticationLevel(categories);
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
        <div className="box-border options-container">
          <a
              data-tooltip-id="ins-tooltip"
              data-tooltip-html="Choose your options<br />
                                If you don't like them, reset<br />
                                Then click start<br />
                                We'll do it no sweat!"
              data-tooltip-place="top"
              className="tooltip-circle tooltip-circle-ins"
            > ? </a>
          <Tooltip id="ins-tooltip"/>
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
      </div>
      <div className="right-container">
        <div className="assurance-container">
          <a
            data-tooltip-id="aa-tooltip"
            data-tooltip-html="Authentication Assurance Levels are an indicator of how strong the set up is.
                              <br /> NOTE: Security Questions do not count as they are not strong enough."
            data-tooltip-place="top"
            className="tooltip-circle tooltip-circle-aa"
          > ? </a>
          <Tooltip id="aa-tooltip"/>
          <h2>Authentication Assurance Level</h2>
          <h3 className={`auth-level-${authenticationLevel}-color`}>{authenticationLevel}</h3>
        </div>
        <div className="buttons-container">
          <button onClick={handleStartClick} disabled={playcode === 0} className="freeplay-start-button primary-button">
            Start!
          </button>
          <button onClick={resetOptions} className="freeplay-reset-button secondary-button">
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

