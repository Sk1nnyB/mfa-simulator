import React from 'react';
import '../pages/Library.css';
import '../library/LibraryList.css';
import { Tooltip } from 'react-tooltip';

function LibraryList({ options, onSelect, selectedOption }) {
  return (
    <div className="library-list box-border">
      <a
        data-tooltip-id="llist-tooltip"
        data-tooltip-html="Don't see your option?<br />
                          Try scrolling down!"
        data-tooltip-place="top"
        className="tooltip-circle tooltip-circle-list"
      > ? </a>
      <Tooltip id="llist-tooltip"/>
      {options.map((option) => (
        <div
          key={option}
          className={`MFA ${selectedOption === option ? 'selected' : ''}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
}

export default LibraryList;
