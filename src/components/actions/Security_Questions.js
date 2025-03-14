import React, { useState, useEffect } from 'react';
import { questions } from '../../data/security_questions';
import freePlayUtils  from '../../hooks/freeplay/FreePlayUtils.js';
import './Security_Questions.css';

function Security_Questions() {
  const { runCode, phone, finished } = freePlayUtils.useVariables("security_questions");
  const handleNextMFA = freePlayUtils.useNextMFA("security_questions");
  const [hasHandledMFA, setHasHandledMFA] = useState(false);

  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [savedAnswer, setSavedAnswer] = useState('');
  const [inputAnswer, setInputAnswer] = useState('');
  const [validAnswer, setValidAnswer] = useState(false);

  useEffect(() => {
      if (finished && !hasHandledMFA) {
        setHasHandledMFA(true);
        handleNextMFA();
      }
    }, [finished]);

  const handleInputChange = (input) => {
    const value = input.target.value;
    setSavedAnswer(value);
    value.length < 3 ? setValidAnswer(false) : setValidAnswer(true);
  };

  const handleInputClick = () => {
    if (!selectedQuestion) {
      alert('No question selected.');
      return;
    }

    if (!savedAnswer || !inputAnswer) {
      alert('No answer given for the security question.');
      return;
    }

    if (!validAnswer) {
      alert('Given answer is too short!');
      return;
    }

    if (savedAnswer.toLowerCase() === inputAnswer.toLowerCase() && !hasHandledMFA) {
      setHasHandledMFA(true);
      handleNextMFA();
    } else {
      alert(`Entered Answer: ${inputAnswer} is not correct! Try again.`);
    }
  };

  return (
    <div className="boxes-action-container">
      <div className="questions-box-container action-box box-border" style={{
        backgroundColor: validAnswer ? (selectedQuestion ? "#dbdfe2" : "#b1e9fa") : "#b1e9fa",
      }}>
        <h2>Step 1: Select Your Question</h2>
        <label htmlFor="select-question">Select question:</label>
        <select
          id="select-question"
          value={selectedQuestion}
          onChange={(input) => setSelectedQuestion(input.target.value)}
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
          onChange={handleInputChange}
        />
      </div>

      <div className="questions-input-container questions-box-container action-box box-border" style={{
        backgroundColor: validAnswer ? (selectedQuestion ? "#b1e9fa" : "#dbdfe2") : "#dbdfe2",
      }}>
        <h2>Step 2: Answer Chosen Question</h2>
        <label htmlFor="input-answer">
          Security Question: <span>{selectedQuestion || 'XXX'}</span>
        </label>
        <input
          type="text"
          id="input-answer"
          placeholder="Enter Here!"
          value={inputAnswer}
          onChange={(input) => setInputAnswer(input.target.value)}
        />
        <button onClick={handleInputClick} className="enter-button primary-button">
          Enter!
        </button>
      </div>
    </div>
  );
}

export default Security_Questions;
