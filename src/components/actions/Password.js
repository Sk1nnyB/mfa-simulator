import React from 'react';

function Password() {
  // Function to handle the button click
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="App">
      <h1>Password</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default Password;