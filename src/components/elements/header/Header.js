// Contains code modified from tutorial by Brian Design: https://www.youtube.com/watch?v=I2UBjN5ER4s&t=1624s&ab_channel=BrianDesign

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='header'>
        <div className='header-container'>
          <Link to='/' className='header-title' onClick={closeMobileMenu}>
          The MFA Simulator
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'header-menu active' : 'header-menu'}>
            <li className='header-item'>
              <Link
                to='/play?story=true'
                className='header-links'
                onClick={closeMobileMenu}>
                Story Mode
              </Link>
            </li>
            <li className='header-item'>
              <Link
                to='/freeplay'
                className='header-links'
                onClick={closeMobileMenu}
              >
                Free Play
              </Link>
            </li>
            <li className='header-item'>
              <Link
                to='/library'
                className='header-links'
                onClick={closeMobileMenu}
              >
                Library
              </Link>
            </li>
            <li className='header-item'>
              <Link
                to='/mfa-assistant'
                className='header-links'
                onClick={closeMobileMenu}
              >
                Assistant App
              </Link>
            </li>
            <li className='header-item'>
              <Link
                to='/feedback'
                className='header-links'
                onClick={closeMobileMenu}
              >
                Feedback
              </Link>
            </li>
            <li className='header-item'>
              <Link
                to='/'
                className='header-links home-link'
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;