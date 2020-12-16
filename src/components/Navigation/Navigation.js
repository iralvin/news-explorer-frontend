import React from 'react';
import { NavLink } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

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

  function createLoginButton() {
    return (
      <button
        className={`navigation__menu-item_button navigation__menu-item_button_${props.savedNewsClass} circle-border`}
        onClick={onLogin}
      >
        Sign In
      </button>
    );
  }

  function createSavedArticlesButton() {
    return (
      <NavLink
        to='/saved'
        activeClassName='navigation__menu-item_active navigation__menu-item_active_black'
      >
        <button
          className={`navigation__menu-item_button navigation__menu-item_button_${props.savedNewsClass}`}
          onClick={props.onSavedArticlesClick}
        >
          Saved articles
        </button>{' '}
      </NavLink>
    );
  }

  function createLogoutButton() {
    if (props.isLoggedIn) {
      return (
        <li
          className={`navigation__menu-item navigation__menu-item_${
            props.mobile ? 'mobile' : ''
          }`}
        >
          <NavLink to='/'>
            <button
              className={`navigation__menu-item_button navigation__menu-item_button_${
                props.savedNewsClass
              } navigation__menu-item_button_user ${
                props.isLoggedIn
                  ? `circle-border circle-border_${props.savedNewsClass}`
                  : ''
              }`}
              onClick={onLogout}
            >
              {currentUser.name || 'temp user'}{' '}
              <span
                className={`navigation__menu-item_logout navigation__menu-item_logout_${props.savedNewsClass}`}
              ></span>
            </button>
          </NavLink>
        </li>
      );
    }
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('navigation__menu_mobile-underlay')) {
      props.disableMobileMenu();
    }
  });

  return (
    <>
      <ul className='navigation__menu-list'>
        <li className='navigation__menu-item navigation__menu-item_home '>
          {' '}
          <NavLink to='/' activeClassName='navigation__menu-item_active'>
            <button
              className={`navigation__menu-item_button navigation__menu-item_button_${props.savedNewsClass}`}
              onClick={props.onHomeClick}
            >
              Home
            </button>{' '}
          </NavLink>
        </li>

        <li
          className={`navigation__menu-item ${
            props.isLoggedIn ? 'navigation__menu-item_account' : ''
          }`}
        >
          {props.isLoggedIn ? createSavedArticlesButton() : createLoginButton()}
        </li>

        {createLogoutButton()}
      </ul>

      <>
        <button
          className={`navigation__menu_mobile_button navigation__menu_mobile_button_${props.savedNewsClass}`}
          onClick={props.onHamburgerClick}
        ></button>

        {props.mobile && (
          <div className='navigation__menu_mobile-underlay'>
            <ul
              className={`navigation__menu-list navigation__menu-list_${
                props.mobile ? 'mobile' : ''
              } navigation__menu-list_${
                props.mobile ? 'mobile' : ''
              }_${props.savedNewsClass}`}
            >
              <li
                className={`navigation__menu-item navigation__menu-item_${
                  props.mobile ? 'mobile' : ''
                } navigation__menu-item_home navigation__menu-item_home_${
                  props.mobile ? 'mobile' : ''
                }`}
              >
                {' '}
                <NavLink to='/' activeClassName='navigation__menu-item_active'>
                  <button
                    className={`navigation__menu-item_button navigation__menu-item_button_${
                      props.savedNewsClass
                    }
                    navigation__menu-item_button_${
                      props.mobile ? 'mobile' : ''
                    }`}
                    onClick={props.onHomeClick}
                  >
                    Home
                  </button>{' '}
                </NavLink>
              </li>

              <li
                className={`navigation__menu-item  navigation__menu-item_${
                  props.mobile ? 'mobile' : ''
                } ${props.isLoggedIn ? 'navigation__menu-item_account' : ''}`}
              >
                {props.isLoggedIn
                  ? createSavedArticlesButton()
                  : createLoginButton()}
              </li>

              {createLogoutButton()}
            </ul>
          </div>
        )}
      </>
    </>
  );
}

export default Navigation;
