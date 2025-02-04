import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Voice.css";
import useSpeechToText from "../../hooks/speechToText";

function Voice() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');
  const story = queryParams.get('story');

  const [speechInput, setSpeechInput] = useState("The voice phrase is: 'this is a voice phrase'. Type here if you have no microphone access!");
  const {listening, input, startInput, stopInput} = useSpeechToText({});

  const targetVoicePhrase = "this is a voice phrase";

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

    if (speechInput === targetVoicePhrase) {
      if (story !== null) {
        navigate(`/play?story=6`);
      } else {
        let pos = parseInt(context[context.length - 1], 16);
        const next = (parseInt(context, 16) + 1).toString(16).toUpperCase().padStart(4, '0');
        pos === 0 ? navigate(`/play?context=${next}`) : navigate(`/play?context=${next}`, { replace: true });
      }
    } else {
      alert(`Entered Voice Phrae: ${speechInput} is not correct! Try again.`);
    }
  };

  return (
    <div className='voice-container'>
      <h1>Voice</h1>
      <textarea
        disable={listening}
        value={listening ? input : speechInput}
        onChange={(e)=>{setSpeechInput(e.target.value)}}
      />
      <div className='button-area'>
        <button
          onClick={toggleListening}
          className='recording-button'
          style={{backgroundColor: listening ? "#ac0e02" : "#0eac23",}}>
            {listening ? 'Stop Listening' : 'Start Recording'}
          </button>
        <button
          onClick={handleVoiceSubmission}
          className='submit-button'
          disabled={listening}>
          Submit
          </button>
      </div>
    </div>
  );
}

export default Voice;