import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className='header-div'>
      <Link to='/' className='header-title'>
            The MFA Simulator
      </Link>
        <nav class="header">
          <ul className='header-buttons'>
            <li>
              <Link
                to='/play?story=1'
                className='header-links'>
                Story Mode
              </Link>
            </li>
            <li>
              <Link
                to='/Freeplay'
                className='header-links'>
                Free Play
              </Link>
            </li>
            <li>
              <Link
                to='/library'
                className='header-links'>
                Library
              </Link>
            </li>
            <li>
              <Link
                to='/'
                className='header-links home-link'>
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;