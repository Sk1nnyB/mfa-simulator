import React from 'react';
import '../pages/Library.css';

function LibraryList({ options, onSelect, selectedOption }) {
  return (
    <div className="library-list">
      {options.map((option) => (
        <div
          key={option}
          className={`MFA ${selectedOption === option ? 'selected' : ''}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
}

export default LibraryList;
