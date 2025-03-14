import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import Popup from 'reactjs-popup';
import { optionsMFA } from '../../data/options_mfa';
import "./FreePlay.css";

function FreePlay() {
  const defaultLinkStub = "https://sk1nnyb.github.io/mfa-simulator/#/";
  const defaultLink = defaultLinkStub + "FreePlay";
  const [options, setOptions] = useState(Array((optionsMFA.length-1)).fill(false));
  const [optionOrder, setOptionOrder] = useState([]);
  const [setupLink, setSetupLink] = useState(defaultLink);
  const [playcode, setPlaycode] = useState(0);
  const [authenticationLevel, setAuthenticationLevel] = useState(0);
  const navigate = useNavigate();

  const toggleOption = (index) => {
    setOptions((prevOptions) => {
      const newOptions = prevOptions.map((option, i) => (i === index ? !option : option));
      let option = newOptions[index];
      let value = index + 1;

      setOptionOrder((prevOrder) => {
        if (option) {
          return [...prevOrder, index];
        } else {
          return prevOrder.filter((i) => i !== index);
        }
      });

      setPlaycode((prevPlaycode) => {
        const newPlaycode = option ? (prevPlaycode * 10) + value : parseInt(prevPlaycode.toString().replace(value.toString(), ''), 10) || 0;

        if (newPlaycode === 0 || isNaN(newPlaycode)) {
          setSetupLink(defaultLink);
          setAuthenticationLevel(0);
        } else {
          setSetupLink(defaultLinkStub+"play?context="+newPlaycode);

          // [Password(0), Sec Ques(1), Auth App(2), Text(3), Email(4), Fingerprint(5), Smart Card(6), Voice(7)]
          let ownership = false;
          let biological = false;
          // let knowledge = false;
          // if (newOptions[0]) {
          //   knowledge = true;
          // }
          if (newOptions[2] || newOptions[3] || newOptions[4] || newOptions[6]) {
            ownership = true;
          }
          if (newOptions[5] || newOptions[7]) {
            biological = true;
          }

          if (ownership && (biological || newOptions[0])) {
            setAuthenticationLevel(3);
          } else if (biological && newOptions[0]) {
            setAuthenticationLevel(2);
          } else if (ownership|| biological || newOptions[0]) {
            setAuthenticationLevel(1);
          } else {
            setAuthenticationLevel(0);
          }
          console.log(ownership);
          console.log(biological);
          console.log(newOptions[0]);
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
    setOptionOrder([]);
    setPlaycode(0);
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
      <div className="left-container box-border">
        <a
            data-tooltip-id="ins-tooltip"
            data-tooltip-html="Scroll through the options,<br/>
                              click the switches in the order<br/>
                              you want them to appear<br/>
                              and make your own story mode!<br />"
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
              <span className="slider" data-number={optionOrder.indexOf(index) + 1 || ""}></span>
            </label>
            <span>{option.name}</span>
          </div>
        ))}
      </div>
      <div className="right-container box-border">
        <div className="assurance-container box-border">
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
                  <p>An <strong>Authenticator Assurance Level (AAL)</strong> is a measure of how secure a run of authentication methods are, not the individual methods themselves. A run with the highest level would be capable of being the "most secure" if well designed and implemented, even if the actual methods are weak and put it at around a level 2.</p>
                  <h3>Categories of Authentication Methods:</h3>
                  <ul>
                    <li><strong>Something you know</strong>
                        <ul>
                            <li>Password</li>
                            <li>Security Questions</li>
                        </ul>
                    </li>
                    <li><strong>Something you have</strong>
                        <ul>
                            <li>Phone (Authentication App / Text)</li>
                            <li>Email</li>
                            <li>Smart card</li>
                        </ul>
                    </li>
                    <li><strong>Something you are</strong>
                        <ul>
                            <li>Fingerprint</li>
                            <li>Voice</li>
                        </ul>
                    </li>
                  </ul>
                    <h3>To achieve each Authentication Assurance Level:</h3>
                  <ol className="instruction-ol">
                      <li>You must select an authentication method.</li>
                      <li>You must select at least 1 method from 2 separate categories.</li>
                      <li>You must select at least 1 method from the "Something you have" category and at least 1 method from another category.</li>
                  </ol>
                  <p><strong>Note:</strong> Security Questions are not strong enough to qualify for any of these levels.</p>
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

