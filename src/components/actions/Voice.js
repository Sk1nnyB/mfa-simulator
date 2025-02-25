import React, { useState } from 'react';
import useSpeechToText from "../../hooks/speechToText";
import useNextMFA from './FreePlayNext.js';
import "./Voice.css";

function Voice() {
  const [speechInput, setSpeechInput] = useState("The voice phrase is: 'this is a voice phrase'.");
  const {listening, input, startInput, stopInput} = useSpeechToText({});
  const targetVoicePhrase = "this is a voice phrase";
  const handleNextMFA = useNextMFA();

  const toggleListening = () => {
    listening ? stopListening() : startInput();
  }

  const stopListening = () => {
    setSpeechInput(input);
    stopInput();
  }

  // Function to handle the button click
  const handleVoiceSubmission = () => {
    if (!speechInput) {
      alert('No voice input given.');
      return;
    }

    if (speechInput.toLowerCase() === targetVoicePhrase) {
      handleNextMFA();
    } else {
      alert(`Entered Voice Phrae: ${speechInput} is not correct! Try again.`);
    }
  };

  const skipVoice = () => {
    handleNextMFA();
  };

  return (
    <div className='voice-container box-border'>
      <h1>Voice</h1>
      <textarea
        readOnly
        value={listening ? input : speechInput}
        onChange={(e)=>{setSpeechInput(e.target.value)}}
      />
      <div className='button-area'>
        <button
          onClick={toggleListening}
          className='primary-button recording-button'
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
          className='grey-button'>
          Skip
          </button>
      </div>
    </div>
  );
}

export default Voice;