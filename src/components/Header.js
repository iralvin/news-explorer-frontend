import React from "react";

function Header(props) {
  return (
    <div>
      <header className="header section">
          <div className="header__container">
              <p className="header__logo">NewsExplorer</p>
              <nav className="header__nav-menu">
                  <ul className="header__nav-menu-list">
                      <li className="header__nav-menu-list-item">Home</li>
                      <li className="header__nav-menu-list-item" onClick={props.onSignInClick}>Sign In</li>
                  </ul>
              </nav>
          </div>
      </header>
    </div>
  );
}

export default Header;
