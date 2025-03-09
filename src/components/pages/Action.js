import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import firebaseUtils  from '../../firebase.js';
import './Action.css';
import { optionsMFA } from '../../data/options_mfa';
import MFAInfo from '../elements/MFAInfo';
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
import authenticators from '../../data/images/authenticators.jpg';
import finish from '../../data/images/finish.jpg';
import LoadingCircle from '../../data/images/LoadingCircle.gif';

function Action() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const story = queryParams.get('story');
  const runCode = queryParams.get('runCode');
  const context = queryParams.get('context');
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(authenticators);

  const actionContainerRef = useRef(null);
  const infoContainerRef = useRef(null);

  async function processContext() {
    if (story !== null || context !== null) {
      return 'start';
    }

    try {
      const position = await firebaseUtils.getField(runCode, "position");
      const story_flag = await firebaseUtils.getField(runCode, "story");
      const phone_flag = await firebaseUtils.getField(runCode, "phone");

      if (story_flag === true) {
        if (parseInt(position) === 1) {
          return optionsMFA[1];
        } else if (parseInt(position) === 2) {
          return optionsMFA[4];
        } else if (parseInt(position) === 3) {
          return optionsMFA[6];
        } else if (parseInt(position) === 4) {
          return optionsMFA[7];
        } else if (parseInt(position) === 5) {
          return 'end';
        }
      }

      const context_flag = await firebaseUtils.getField(runCode, "context");
      if (context_flag !== null) {
        const binaryString = context_flag.toString(2).split('').map(bit => parseInt(bit, 10)).reverse();
        const num_mfa = binaryString.filter((bit) => bit === 1).length;
        if (position === (num_mfa + 1)) {
          return 'end';
        }
        console.log(position);
        let count = 0;
        for (let i = 0; i < binaryString.length; i++) {
          if (binaryString[i] === 1) {
            count++;
            if (count === parseInt(position)) {
              return optionsMFA[i + 1];
            }
          }
        }
      }

      navigate('/freeplay', { replace: true });

    } catch (error) {
      console.error("Error in processContext:", error);
    }
  }

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const processedResult = await processContext();
        setResult(processedResult); // Update the result state
      } catch (error) {
        console.error("Error in processContext:", error);
      }
    };

    fetchContext();
  }, [story, context, runCode]);


  useEffect(() => {
    if (result && result.image) {
      setImage(result.image);
    } else if (result) {
      setImage(authenticators);
    } else {
      setImage(LoadingCircle);
    }
  }, [result]);

  useEffect(() => {
    if (actionContainerRef.current) {
      actionContainerRef.current.scrollTop = 0;
    }
    if (infoContainerRef.current) {
      infoContainerRef.current.scrollTop = 0;
    }
  }, [result]);

  if (result === 'start') {
    return (
      <div className="action">
        <FreePlayStart />
      </div>
    );
  }

  if (result === 'end') {
    return (
      <div className="action" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${finish}) center center/cover no-repeat`}}>
        <FreePlayEnd />
      </div>
    );
  }

  return (
    <div className="action" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image}) center center/cover no-repeat`}}>
      <div className="action-container" ref={actionContainerRef}>
        {result && result.name === 'Authentication App' ? <Authentication_App /> : null}
        {result && result.name === 'Email Code' ? <Email /> : null}
        {result && result.name === 'Fingerprint Scanner' ? <Fingerprint /> : null}
        {result && result.name === 'Password' ? <Password /> : null}
        {result && result.name === 'Security Questions' ? <Security_Questions /> : null}
        {result && result.name === 'Smart Card' ? <Smart_Card /> : null}
        {result && result.name === 'Text (SMS) Code' ? <Text /> : null}
        {result && result.name === 'Voice Recognition' ? <Voice /> : null}
      </div>
      <div className="info-container" ref={infoContainerRef}>
      {result ? (
        <MFAInfo
          MFA={result}
          instructions_flag={1}
          more_information_flag={0}
        />
      ) : null}
      </div>
    </div>
  );
}

export default Action;
