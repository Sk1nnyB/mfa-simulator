import React from 'react';

function Authentication_App() {
  // Function to handle the button click
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="App">
      <h1>Authentication_App</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default Authentication_App;