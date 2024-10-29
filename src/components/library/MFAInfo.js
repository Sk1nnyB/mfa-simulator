import React from 'react';
import '../pages/Library.css';

function MFAInfo({ title, description }) {
  return (
    <div className="mfa-info-card">
      <div className="mfa-image">
        <p>Photo of {title}</p>
      </div>
      <div className="mfa-info">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default MFAInfo;