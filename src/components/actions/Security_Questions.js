import React from 'react';

function Security_Questions() {
  // Function to handle the button click
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="App">
      <h1>Security_Questions</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default Security_Questions;