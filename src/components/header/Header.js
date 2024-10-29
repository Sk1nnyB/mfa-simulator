import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className='header-container'>
      <Link to='/' className='header-title'>
            The MFA Simulator
      </Link>
        <nav>
          <ul className='header-buttons'>
            <li>
              <Link
                to='/'
                className='header-links'>
                Story Mode
              </Link>
            </li>
            <li>
              <Link
                to='/'
                className='header-links'>
                Sandbox
              </Link>
            </li>
            <li>
              <Link
                to='/'
                className='header-links'>
                Library
              </Link>
            </li>
            <li>
              <Link
                to='/'
                className='home-link'>
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