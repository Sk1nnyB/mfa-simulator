import React from 'react';

function Voice() {
  // Function to handle the button click
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="App">
      <h1>Voice</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default Voice;