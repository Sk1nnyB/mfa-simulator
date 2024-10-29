import React, { useState, useEffect } from 'react';
import LibraryList from '../library/LibraryList';
import MFAInfo from '../library/MFAInfo';
import './Library.css';

function Library() {
  const [selectedMFA, setSelectedMFA] = useState(null);

  const optionsMFA = [
    { name: 'Password', description: 'Password description. I think I new more than one word to pass this...' },
    { name: 'Security Questions', description: 'Security Questions description. Used to practice for the security guard test.' },
    { name: 'Authentication App', description: 'Authentication App description. Cannot use AI, must be authentic.' },
    { name: 'Text (SMS)', description: 'Text (SMS) description. Not the texts I should really be studying.' },
    { name: 'Email', description: 'Email description. Where my efemail representation at? ' },
    { name: 'Fingerprint', description: 'Fingerprint description. Each one could be unique per user?' },
    { name: 'Smart Card', description: 'Smart card description. Smartest card I know is Animate Dead.' },
    { name: 'Voice', description: 'Voice recognition description. Voice any concerns pronto.' },
  ];

  const handleSelectOption = (name) => {
    const selected = optionsMFA.find((option) => option.name === name);
    setSelectedMFA(selected);
  };

  return (
    <div className="library">
      <LibraryList
        options={optionsMFA.map((option) => option.name)}
        onSelect={handleSelectOption}
        selectedOption={selectedMFA?.name}
      />
      <MFAInfo
        title={selectedMFA ? selectedMFA.name : 'MFA Title'}
        description={selectedMFA ? selectedMFA.description : 'MFA Description. Probably has a link to the wiki page for it.'}
      />
    </div>
  );
}

export default Library;