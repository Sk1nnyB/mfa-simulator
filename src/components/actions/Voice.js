// Contains code modified from tutorial by Code Radiance: https://www.youtube.com/watch?v=xJ_V55awyIo&t=76s&ab_channel=CodeRadiance
import React, { useState, useEffect } from 'react';
import useSpeechToText from "../../hooks/speechToText";
import freePlayUtils  from '../../hooks/freeplay/FreePlayUtils.js';
import "./Voice.css";

function Voice() {
  const { runCode, phone, finished } = freePlayUtils.useVariables("voice");
  const handleNextMFA = freePlayUtils.useNextMFA("voice");
  const [hasHandledMFA, setHasHandledMFA] = useState(false);

  const [speechInput, setSpeechInput] = useState("The voice phrase is: 'this is a voice phrase'.");
  const {listening, input, startInput, stopInput} = useSpeechToText({});
  const targetVoicePhrase = "this is a voice phrase";

  useEffect(() => {
      if (finished && !hasHandledMFA) {
        setHasHandledMFA(true);
        handleNextMFA();
      }
    }, [finished]);

  const toggleListening = () => {
    listening ? stopListening() : startInput();
  }

  const stopListening = () => {
    setSpeechInput(input);
    stopInput();
  }

  const handleVoiceSubmission = () => {
    if (!speechInput) {
      alert('No voice input given.');
      return;
    }

    if (speechInput.toLowerCase() === targetVoicePhrase) {
      handleNextMFA();
    } else {
      alert(`Entered Voice Phrase: ${speechInput} is not correct! Try again.`);
    }
  };

  const skipVoice = () => {
    if (!hasHandledMFA) {
      setHasHandledMFA(true);
      handleNextMFA();
    }
  };

  return (
    <div className='voice-container generic-action-container box-border'>
      <h1>Voice</h1>
      <textarea
        readOnly
        value={listening ? input : speechInput}
        onChange={(input)=>{setSpeechInput(input.target.value)}}
        className='voice-textarea'
      />
      <div className='button-area'>
        <button
          onClick={toggleListening}
          className='recording-button primary-button'
          style={{backgroundColor: listening ? "#ac0e02" : "#0eac23",}}>
            {listening ? 'Stop Listening' : 'Start Recording'}
          </button>
        <button
          onClick={handleVoiceSubmission}
          className='primary-button'
          disabled={listening}>
          Submit
          </button>
      </div>
      <div className='button-area'>
        <button
          onClick={skipVoice}
          className='skip-button'>
          Skip
          </button>
      </div>
    </div>
  );
}

export default Voice;