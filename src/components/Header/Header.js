import React from "react";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  function enableMobileMenu() {
    console.log("setting mobile true");
    setIsMobileMenuOpen(true);
  }

  function disableMobileMenu() {
    console.log("setting mobile false");
    setIsMobileMenuOpen(false);
  }

  return (
    <header
      className={`header 
      header_${isMobileMenuOpen || props.isPopupOpened ? "mobile" : ""} 
      header_${isMobileMenuOpen || props.isPopupOpened ? "mobile" : ""}_${
        props.savedNewsClass
      } 
      header_${props.savedNewsClass}`}
    >
      <div className="header__container">
        <p className="header__logo">NewsExplorer</p>

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
