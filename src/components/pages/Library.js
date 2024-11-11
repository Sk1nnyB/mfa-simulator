import React, { useState, useEffect } from 'react';
import LibraryList from '../library/LibraryList';
import MFAInfo from '../library/MFAInfo';
import './Library.css';
import { optionsMFA } from '../../data/options_mfa';

function Library() {
  const [selectedMFA, setSelectedMFA] = useState(null);

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