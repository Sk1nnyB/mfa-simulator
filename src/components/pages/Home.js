import React from 'react';
import { StoryButton, SandboxButton } from '../Button';
import './Home.css';

function Home() {
  return (
    <div className='home-container'>
      <h1>
        The MFA Simulator
      </h1>
      <p>Description of MFA, brief and simple on why it has come to be and how it works.</p>
      <div className='home-btns'>
        <StoryButton
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Try Story Mode
        </StoryButton>
        <SandboxButton
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          Sandbox
        </SandboxButton>
      </div>
    </div>
  );
}

export default Home;