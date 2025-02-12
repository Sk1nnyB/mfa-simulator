import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Action.css';
import { optionsMFA } from '../../data/options_mfa';
import MFAInfo from '../library/MFAInfo';
import FreePlayStart from '../actions/FreePlayStart';
import FreePlayEnd from '../actions/FreePlayEnd';
import Authentication_App from '../actions/Authentication_App';
import Email from '../actions/Email';
import Fingerprint from '../actions/Fingerprint';
import Password from '../actions/Password';
import Security_Questions from '../actions/Security_Questions';
import Smart_Card from '../actions/Smart_Card';
import Text from '../actions/Text';
import Voice from '../actions/Voice';

function Action() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const story = queryParams.get('story');
  const startPage = queryParams.get('startPage');
  const context = queryParams.get('context');
  const [result, setResult] = useState(null);

  function processContext() {
    if (story !== null) {
      if ((parseInt(story) === 2)) {
        return optionsMFA[0]
      } else if ((parseInt(story) === 3)){
        return optionsMFA[3]
      } else if ((parseInt(story) === 4)){
        return optionsMFA[6]
      } else if ((parseInt(story) === 5)){
        return optionsMFA[7]
      } else if ((parseInt(story) === 6)){
        return 'end'
      }
      return 'start'
    }

    if (startPage !== null && parseInt(startPage) === 1) {
      return 'start'
    }

    if (context.length !== 4) {
      navigate('/freeplay', { replace: true });
    }

    let options = context.slice(0, -1); // Take up to the first 3 as mfa present in options array
    let boptions = parseInt(options, 16).toString(2).padStart(12, '0').split('').map(bit => parseInt(bit));
    let pos = parseInt(context[context.length - 1], 16); // Take the last as the current position in the array
    let num_mfa = [...boptions].filter(bit => bit === 1).length;

    if (pos == num_mfa){
      return 'end'
    } else if (pos > num_mfa) {
      navigate('/freeplay', { replace: true });
    }

    let count = 0;
    for (let i = 0; i < optionsMFA.length; i++) {
      if (boptions[i] === 1) {
        if (count === pos) {
          return optionsMFA[i];
        }
        count++;
      }
    }
  }

  useEffect(() => {
    if (context || story) {
      const processedResult = processContext();
      setResult(processedResult); // Update the result state
    }
  }, [story, startPage, context]);

  if (result === 'start') {
    return (
      <div className="action">
        <FreePlayStart />
      </div>
    );
  }

  if (result === 'end') {
    return (
      <div className="action">
        <FreePlayEnd />
      </div>
    );
  }

  return (
    <div className="action">
      <div className="action-container">
        {result && result.name === 'Authentication App' ? (
          <Authentication_App />
        ) : null}
        {result && result.name === 'Email Code' ? (
          <Email />
        ) : null}
        {result && result.name === 'Fingerprint Scanner' ? (
          <Fingerprint />
        ) : null}
        {result && result.name === 'Password' ? (
          <Password />
        ) : null}
        {result && result.name === 'Security Questions' ? (
          <Security_Questions />
        ) : null}
        {result && result.name === 'Smart Card' ? (
          <Smart_Card />
        ) : null}
        {result && result.name === 'Text (SMS) Code' ? (
          <Text />
        ) : null}
        {result && result.name === 'Voice Recognition' ? (
          <Voice />
        ) : null}
      </div>
      <div className="info-container">
        <MFAInfo
          MFA={result ? result : 'Error'}
          instructions_flag={result ? 1 : 0}
          more_information_flag={0}
        />
      </div>
    </div>
  );
}

export default Action;