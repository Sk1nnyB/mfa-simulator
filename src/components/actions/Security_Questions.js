import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { questions } from '../../data/security_questions'; // Import the questions
import './Security_Questions.css';

function Security_Questions() {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [savedAnswer, setSavedAnswer] = useState('');
  const [inputAnswer, setInputAnswer] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');
  let pos = parseInt(context[context.length - 1], 16);

  const handleInputClick = () => {
    if (!savedAnswer || !inputAnswer) {
      alert('No answer given for the security question.');
      return;
    }

    if (savedAnswer === inputAnswer) {
      const next = (parseInt(context, 16) + 1).toString(16).toUpperCase();
      if (pos === 0) {
        navigate(`/play?context=${next}`);
      } else {
        navigate(`/play?context=${next}`, { replace: true });
      }
    } else {
      alert(`Entered Answer: ${inputAnswer} is not correct! Try again.`);
    }
  };

  return (
    <div className="questions-container">
      <div className="questions-select-container">
        <label htmlFor="select-question">Select question:</label>
        <select
          id="select-question"
          value={selectedQuestion}
          onChange={(e) => setSelectedQuestion(e.target.value)}
        >
          <option value="">Select...</option>
          {questions.map((q) => (
            <option key={q.id} value={q.question}>
              {q.question}
            </option>
          ))}
        </select>
        <label htmlFor="saved-answer">Answer:</label>
        <input
          type="text"
          id="saved-answer"
          placeholder="Enter Here!"
          value={savedAnswer}
          onChange={(e) => setSavedAnswer(e.target.value)}
        />
      </div>

      <div className="questions-input-container">
        <label htmlFor="input-answer">
          Security Question: <span>{selectedQuestion || 'XXX'}</span>
        </label>
        <input
          type="text"
          id="input-answer"
          placeholder="Enter Here!"
          value={inputAnswer}
          onChange={(e) => setInputAnswer(e.target.value)}
        />
        <button onClick={handleInputClick} className="enter-button">
          Enter
        </button>
      </div>
    </div>
  );
}

export default Security_Questions;
