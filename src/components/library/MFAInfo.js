import React from 'react';
import '../pages/Library.css';
import '../library/MFAInfo.css';
import placeholder from '../../images/placeholder.jpg';

function MFAInfo({ MFA, instructions_flag, more_information_flag }) {

  const returnMoreInformation = (fun_fact, examples) => {
    return (
      <div>
        <h2>Where are they found?</h2>
        <p>{examples}</p>
        <h2>Tips on usage:</h2>
        <p>{tips}</p>
        <h2>Fun Fact:</h2>
        <p>{fun_fact}</p>
        <h4>Click here for more information: <a href="{wiki_link}">Wikipedia Link</a></h4>
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
  if (MFA != 'default') {
    name = MFA.name;
    description = MFA.description;
    why = MFA.why;
    examples = MFA.examples;
    how = MFA.how;
    tips = MFA.tips;
    fun_fact = MFA.fun_fact;
    wiki_link =  MFA.wiki_link;
    image = MFA.image;
  } else {
    name = 'Authenticators';
    description = "Authenticators are methods of 'authenticating' a user, which is essentially making sure a user is who they say they are. A multi-factor authenticator \
                  is simply a combination of multiple authenticators.";
    why = "Authenticators are used to ensure the security of a user's data, account or other sensitive information.";
    examples = 'Knowledge - something the user knows (Password, Security Question); \
                Possession - something the user owns (Authentication App, Text, Email, Smart Card); \
                Biometric - something the user is (Voice, Fingerprint)';
    how = 'Each authenticator works in a different way! To find out how, simply click or tap on the authentication method you would like to find out more about.';
    tips = 'When dealing with authentication methods, it is important to not cut corners or use unsafe practices, especially with important accounts like banking or government websites.';
    fun_fact = 'This website was created by a student from the University of Manchester in 2024/5 as part of their dissertation!';
    wiki_link =  'https://en.wikipedia.org/wiki/Multi-factor_authentication';
    image = placeholder;
  }

  return (
    <div className="box-border mfa-info-card">
      <div>
        <img className="mfa-image" src={image} alt='Image of MFA' />
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
        {more_information_flag ? returnMoreInformation(fun_fact, examples) : ''}
      </div>
      {instructions_flag ? returnInstructions() : ''}
    </div>
  );
}

export default MFAInfo;