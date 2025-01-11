import React, { useState } from 'react';
import LibraryList from '../library/LibraryList';
import MFAInfo from '../library/MFAInfo';
import './Library.css';
import { optionsMFA } from '../../data/options_mfa';

function Library() {
  const [selectedMFA, setSelectedMFA] = useState(null);

  const handleSelectOption = (name) => {
    var selected = optionsMFA.find((option) => option.name === name);
    if (selectedMFA == selected) {
      selected = 'default';
    }
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
        MFA={selectedMFA ? selectedMFA : 'default'}
        instructions_flag={0}
        more_information_flag={1}
      />
    </div>
  );
}

export default Library;