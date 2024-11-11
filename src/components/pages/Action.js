import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Action.css';
import { optionsMFA } from '../../data/options_mfa';
import MFAInfo from '../library/MFAInfo';
import SandboxEnd from '../actions/SandboxEnd';
import Authentication_App from '../actions/Authentication_App';
import Email from '../actions/Email';
import Fingerprint from '../actions/Fingerprint';
import Password from '../actions/Password';
import Security_Questions from '../actions/Security_Questions';
import Smart_Card from '../actions/Smart_Card';
import Text from '../actions/Text';
import Voice from '../actions/Voice';



function processContext(context) {
  if (context.length !== 4) {
    throw new Error('Invalid input: Context must be 4 digits and array must have 8 elements.');
  }

  let options = context.slice(0, 3); // Take the first 3 as the values in the mfa options array
  let boptions = parseInt(options, 16).toString(2).padStart(12, '0');
  let pos = parseInt(context[3], 16); // Take the last as the current position in the array

  let workingArray = optionsMFA.filter((value) => {
    let binStr = value.toString(2).padStart(12, '0');
    return binStr !== boptions;
  });

  if (pos == workingArray.length){
    return 'end'
  }
  return workingArray[pos];

}

function Action() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');
  const [result, setResult] = useState(null);


  useEffect(() => {
    if (context) {
      const processedResult = processContext(context);
      setResult(processedResult); // Update the result state
    }
  }, [context]);

  if (result === 'end') {
    return (
      <div className="action">
        <SandboxEnd />
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
      {result && result.name === 'Text' ? (
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