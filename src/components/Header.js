import React from 'react';
import Navigation from './Navigation';

function Header(props) {
  return (
    <header className={`header ${props.savedNewsHeader}`}>
      <div className='header__container'>
        <p className='header__logo'>NewsExplorer</p>
        <Navigation onSignInClick={props.onSignInClick} isLoggedIn={props.isLoggedIn}/>
      </div>
    </header>
  );
}

export default Header;
