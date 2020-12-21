import React from "react";
import { NavLink } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

function Navigation(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [mobile, setMobile] = React.useState(false);
  // const [windowWidth, setWindowWidth] = React.useState()

  function onLogin() {
    props.disableMobileMenu();
    props.onSignInClick();
  }

  function onLogout() {
    props.disableMobileMenu();
    props.onLogout();
  }

  function onMenuClick() {
    if (props.isMobileMenuOpen || props.isPopupOpened) {
      props.closePopups();
      props.disableMobileMenu();
    } else {
      props.onHamburgerClick();
    }
  }

  function createLoginButton() {
    return (
      <li
        className={`navigation__menu-item ${
          props.isLoggedIn ? "navigation__menu-item_account" : ""
        }`}
      >
        <button
          className={`navigation__menu-item_button navigation__menu-item_button_${props.savedNewsClass} circle-border`}
          onClick={onLogin}
        >
          Sign In
        </button>
      </li>
    );
  }

  function createSavedArticlesButton() {
    return (
      <NavLink
        to="/saved"
        activeClassName="navigation__menu-item_active navigation__menu-item_active_black"
        style={{ textDecoration: "none", display: "flex" }}
      >
        <li
          className={`navigation__menu-item ${
            props.isLoggedIn ? "navigation__menu-item_account" : ""
          }`}
        >
          <button
            className={`navigation__menu-item_button navigation__menu-item_button_${props.savedNewsClass}`}
            onClick={props.onSavedArticlesClick}
          >
            Saved articles
          </button>{" "}
        </li>
      </NavLink>
    );
  }

  function createLogoutButton() {
    if (props.isLoggedIn) {
      return (
        <NavLink
          exact
          to="/"
          style={{ textDecoration: "none", display: "flex" }}
        >
          <li
            className={`navigation__menu-item navigation__menu-item_${
              props.isMobileMenuOpen ? "mobile" : ""
            }`}
          >
            <button
              className={`navigation__menu-item_button navigation__menu-item_button_${
                props.savedNewsClass
              } navigation__menu-item_button_user ${
                props.isLoggedIn
                  ? `circle-border circle-border_logged-in circle-border_${props.savedNewsClass}`
                  : ""
              }`}
              onClick={onLogout}
            >
              {currentUser.name || "temp user"}{" "}
              <span
                className={`navigation__menu-item_logout navigation__menu-item_logout_${props.savedNewsClass}`}
              ></span>
            </button>
          </li>{" "}
        </NavLink>
      );
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("navigation__menu_mobile-underlay")) {
      props.disableMobileMenu();
    }
  });

  return (
    <>
      <ul className="navigation__menu-list">
        <NavLink
          exact
          to="/"
          activeClassName="navigation__menu-item_active"
          style={{ textDecoration: "none", display: "flex" }}
        >
          <li className="navigation__menu-item navigation__menu-item_home ">
            {" "}
            <button
              className={`navigation__menu-item_button navigation__menu-item_button_${props.savedNewsClass}`}
              onClick={props.onHomeClick}
            >
              Home
            </button>{" "}
          </li>
        </NavLink>

        {props.isLoggedIn ? createSavedArticlesButton() : createLoginButton()}

        {createLogoutButton()}
      </ul>

      <>
        <button
          className={`navigation__menu_mobile_button navigation__menu_mobile_button_${
            props.savedNewsClass
          } navigation__menu_mobile_button_${
            props.isMobileMenuOpen || props.isPopupOpened ? "opened" : ""
          }`}
          onClick={onMenuClick}
        ></button>

        {/* REMOVE EXTRA MENTIONS OF PROPS.ISMOBILEMENUOPEN SINCE ONLY NEED 1 TO DETERMINE IF DISPLAY OR NOT */}
        {props.isMobileMenuOpen && (
          <div className="navigation__menu_mobile-underlay">
            <ul
              className={`navigation__menu-list navigation__menu-list_${
                props.isMobileMenuOpen ? "mobile" : ""
              } navigation__menu-list_${
                props.isMobileMenuOpen ? "mobile" : ""
              }_${props.savedNewsClass}`}
            >
              <li
                className={`navigation__menu-item navigation__menu-item_${
                  props.isMobileMenuOpen ? "mobile" : ""
                } navigation__menu-item_home navigation__menu-item_home_${
                  props.isMobileMenuOpen ? "mobile" : ""
                }`}
              >
                {" "}
                <NavLink
                  to="/"
                  activeClassName="navigation__menu-item_active"
                  style={{ textDecoration: "none", display: "flex" }}
                >
                  <button
                    className={`navigation__menu-item_button navigation__menu-item_button_${
                      props.savedNewsClass
                    }
                    navigation__menu-item_button_${
                      props.isMobileMenuOpen ? "mobile" : ""
                    }`}
                    onClick={props.onHomeClick}
                  >
                    Home
                  </button>{" "}
                </NavLink>
              </li>

              {props.isLoggedIn
                ? createSavedArticlesButton()
                : createLoginButton()}
              {createLogoutButton()}
            </ul>
          </div>
        )}
      </>
    </>
  );
}

export default Navigation;
