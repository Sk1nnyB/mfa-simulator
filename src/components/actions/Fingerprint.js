import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Fingerprint() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get('context');
  let pos = parseInt(context[context.length - 1], 16);

  // Function to handle the button click
  const handleClick = () => {
    const next = (parseInt(context, 16) + 1).toString(16).toUpperCase();
    if (pos === 0) {
      navigate(`/play?context=${next}`);
    } else {
      navigate(`/play?context=${next}`, { replace: true });
    }
  };

  return (
    <div className="App">
      <h1>Fingerprint</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default Fingerprint;