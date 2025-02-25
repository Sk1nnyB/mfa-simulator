import React, { useRef, useEffect } from 'react';
import '../pages/Library.css';
import '../library/MFAInfo.css';


function MFAInfo({ MFA, instructions_flag, more_information_flag }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [MFA, instructions_flag, more_information_flag]);

  const returnMoreInformation = () => {
    return (
      <div>
        <h2>Where are they found?</h2>
        <p>{examples}</p>
        <h2>Tips on usage:</h2>
        <p>{tips}</p>
        <h2>Fun Fact:</h2>
        <p>{fun_fact}</p>
        <h4>Click here for more information: <a href={wiki_link} target="_blank" rel="noopener noreferrer">Wikipedia Link</a></h4>
      </div>
    );
  };


  const returnInstructions = () => {
    const instructions = MFA.instructions;
    return (
      <div className='box-border text-box mfa-instructions'>
        <h4>Instructions</h4>
        <ol>
          {instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        {MFA.note ? <h3>{MFA.note}</h3> : ''}
      </div>
    );
  };

  var name, description, why, examples, how, tips, fun_fact, wiki_link = "";
  var image;
  name = MFA.name;
  description = MFA.description;
  why = MFA.why;
  examples = MFA.examples;
  how = MFA.how;
  tips = MFA.tips;
  fun_fact = MFA.fun_fact;
  wiki_link = MFA.wiki_link;
  image = MFA.image;

  return (
    <div className="box-border mfa-info-card" ref={scrollRef}>
      <div className='mfa-image-div'>
        {instructions_flag ? returnInstructions() : <img className="mfa-image" src={image} alt='Image of MFA' />}
      </div>
      <div className='mfa-title'>
        <h3>{name}</h3>
      </div>
      <div className="box-border text-box mfa-info">
        <h2>What are they?</h2>
        <p>{description}</p>
        <h2>Why are they used?</h2>
        <p>{why}</p>
        <h2>How do they work?</h2>
        <p>{how}</p>
        {MFA.secure && (
          <>
            <h2>What makes a secure {MFA.name}?</h2>
            <p>{MFA.secure}</p>
          </>
        )}
        {more_information_flag ? returnMoreInformation(fun_fact, examples) : ''}
      </div>
    </div>
  );
}

export default MFAInfo;
