import React, { useState } from "react";
import "./FreePlay.css";
import { optionsMFA } from '../../data/options_mfa';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import Popup from 'reactjs-popup';

function FreePlay() {
  const defaultLinkStub = "https://sk1nnyb.github.io/mfa-simulator/#/";
  const defaultLink = defaultLinkStub + "FreePlay";
  const [options, setOptions] = useState(Array((optionsMFA.length-1)).fill(false));
  const [setupLink, setSetupLink] = useState(defaultLink);
  const [playcode, setPlaycode] = useState(0);
  const [authenticationLevel, setAuthenticationLevel] = useState(0);
  const navigate = useNavigate();

  const toggleOption = (index) => {
    setOptions((prevOptions) => {
      const newOptions = prevOptions.map((option, i) => (i === index ? !option : option));
      let option = newOptions[index];
      let value = 2 ** (index);

      setPlaycode((prevPlaycode) => {
        const newPlaycode = option ? prevPlaycode + value : prevPlaycode - value;

        if (newPlaycode === 0) {
          setSetupLink(defaultLink);
          setAuthenticationLevel(0);
        } else {
          setSetupLink(defaultLinkStub+"play?context="+newPlaycode);

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
    navigate(`/play?context=${playcode}`);
  };

  const resetOptions = () => {
    setOptions(Array((optionsMFA.length-1)).fill(false));
    setSetupLink(defaultLink);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(setupLink).then(() => {
      alert("Link copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy link: ", err);
    });
  }

  return (
    <div className="freeplay">
      <div className="box-border left-container">
        <a
            data-tooltip-id="ins-tooltip"
            data-tooltip-html="Scroll through the options,<br/>
                              click the switches and<br/>
                              make your own story mode<br />"
            data-tooltip-place="top"
            className="tooltip-circle tooltip-circle-ins"
          > ? </a>
        <Tooltip id="ins-tooltip"/>
        {optionsMFA.slice(1).map((option, index) => (
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
      <div className="box-border right-container">
        <div className="assurance-container">
          <h2>Authentication Assurance Level</h2>
          <h3 className={`auth-level-${authenticationLevel}-color`} data-testid="auth-level">
            {authenticationLevel}
          </h3>
          <Popup
            trigger={<button className="primary-button"> What are AALs? </button>}
            modal
            nested
          >
            {close => (
              <div className="box-border modal">
                <div className="modal-header">Authentication Assurance Levels </div>
                <div className="modal-content">
                  {' '}
                  Content about AALs
                </div>
                <div className="modal-actions">
                  <button
                    className="secondary-button"
                    onClick={() => {
                      close();
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
        <div className="freeplay-buttons-container">
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
          <div className="freeplay-buttons-container">
            <button onClick={copyToClipboard} className="freeplay-copy-button secondary-button">
              Copy
            </button>
          </div>
        </div>
    </div>
  );
}

export default FreePlay;

