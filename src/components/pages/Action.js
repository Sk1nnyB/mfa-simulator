import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Action.css';
import { optionsMFA } from '../../data/options_mfa';
import MFAInfo from '../library/MFAInfo';
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
  const context = queryParams.get('context');
  const [result, setResult] = useState(null);

  function processContext() {
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
    if (context) {
      const processedResult = processContext();
      setResult(processedResult); // Update the result state
    }
  }, [context]);

  if (result === 'end') {
    return (
      <div className="action">
        <FreePlayEnd />
      </div>
    );
  }

  return (
    <div className="action">
      {result && result.name === 'Authentication App' ? (
        <Authentication_App />
      ) : null}
      {result && result.name === 'Email' ? (
        <Email />
      ) : null}
      {result && result.name === 'Fingerprint' ? (
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
      {result && result.name === 'Text (SMS)' ? (
        <Text />
      ) : null}
      {result && result.name === 'Voice' ? (
        <Voice />
      ) : null}
      <MFAInfo
        title={result ? result.name : 'Error'}
        description={result ? result.description : 'Error. Please return home and try again.'}
      />
    </div>
  );
}

export default Action;