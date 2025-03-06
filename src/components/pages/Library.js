import React, { useState } from 'react';
import LibraryList from '../elements/library/LibraryList';
import MFAInfo from '../elements/MFAInfo';
import './Library.css';
import { optionsMFA } from '../../data/options_mfa';


function Library() {
  const [selectedMFA, setSelectedMFA] = useState(optionsMFA.find(option => option.name === "Authenticators"));

  const handleSelectOption = (name) => {
    var selected = optionsMFA.find((option) => option.name === name);
    setSelectedMFA(selected);
  };

  return (
    <div className="library">
      <LibraryList
        options={optionsMFA.map((option) => option.name)}
        onSelect={handleSelectOption}
        selectedOption={selectedMFA.name}
      />
      <MFAInfo
        MFA={selectedMFA}
        instructions_flag={0}
        more_information_flag={1}
      />
    </div>
  );
}

export default Library;