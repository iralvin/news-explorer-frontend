import React from 'react';
import Navigation from '../Navigation/Navigation';
import {useHistory} from "react-router-dom"

function Header(props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const history = useHistory()

  function enableMobileMenu() {
    setIsMobileMenuOpen(true);
  }

  function disableMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function handleLogoClick(){
    console.log("clicked logo")
    history.push("/")
  }

  return (
    <header
      className={`
        header 
        header_${props.savedNewsClass}
        header_${isMobileMenuOpen || props.isPopupOpened ? 'mobile' : ''} 
        header_${isMobileMenuOpen || props.isPopupOpened ? 'mobile' : ''}_${props.savedNewsClass} 
      `}
    >
      <div className='header__container'>
        <p className='header__logo' onClick={handleLogoClick}>NewsExplorer</p>

        <Navigation
          isPopupOpened={props.isPopupOpened}
          closePopups={props.closePopups}
          onHamburgerClick={enableMobileMenu}
          disableMobileMenu={disableMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
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
