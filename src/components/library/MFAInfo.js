import React from 'react';
import '../pages/Library.css';

function MFAInfo({ title, description, instructions, instructions_flag }) {
  return (
    <div className="mfa-info-card">
      <div className="mfa-image">
        <p>Photo of {title}</p>
      </div>
      <div className="mfa-info">
        <h2>{title}</h2>
        <p>{description}</p>
        {instructions_flag ?
          <h4>
            Instructions
          </h4>: ''
        }
        {instructions_flag ?
          <ol>
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          : ''}
      </div>
    </div>
  );
}

export default MFAInfo;