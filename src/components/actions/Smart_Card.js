import React from 'react';

function Smart_Card() {
  // Function to handle the button click
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="App">
      <h1>Smart_Card</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default Smart_Card;