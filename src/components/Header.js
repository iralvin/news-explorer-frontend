import React from 'react';
import Navigation from './Navigation';

function Header(props) {
  return (
    <header className={`header header__${props.savedNewsClass}`}>
      <div className='header__container'>
        <p className='header__logo'>NewsExplorer</p>
        <Navigation
          onLogout={props.onLogout}
          onHomeClick={props.onHomeClick}
          onSavedArticlesClick={props.onSavedArticlesClick}
          onSignInClick={props.onSignInClick}
          isLoggedIn={props.isLoggedIn}
          savedNewsClass={props.savedNewsClass}
        />
      </div>
    </header>
  );
}

export default Header;
