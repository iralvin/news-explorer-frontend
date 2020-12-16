import React from 'react';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const [mobile, setMobile] = React.useState(false);

  function enableMobileMenu() {
    console.log('setting mobile true');
    setMobile(true);
  }

  function disableMobileMenu() {
    console.log('setting mobile false');
    setMobile(false);
  }

  return (
    <header
      className={`header header__${mobile ? 'mobile' : ''} header__${
        mobile ? 'mobile' : ''
      }_${props.savedNewsClass} header__${props.savedNewsClass}`}
    >
      <div className='header__container'>
        <p className='header__logo'>NewsExplorer</p>

        <Navigation
          onHamburgerClick={enableMobileMenu}
          disableMobileMenu={disableMobileMenu}
          mobile={mobile}
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
