import React from 'react';
import { NavLink } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

function Navigation(props) {
  const currentUser = React.useContext(CurrentUserContext);

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
        className={`
        navigation__menu-item 
        navigation__menu-item_${props.isMobileMenuOpen ? 'mobile' : ''}
      `}
      >
        <button
          className={`navigation__menu-item-button circle-border`}
          onClick={onLogin}
        >
          Sign In
        </button>
      </li>
    );
  }

  function createSavedArticlesButton() {
    return (
      <li>
        <NavLink
          className={`navigation__menu-item navigation__menu-item_${
            props.isMobileMenuOpen ? 'mobile' : ''
          }`}
          activeClassName='navigation__menu-item_active navigation__menu-item_active-black'
          to='/saved-news'
        >
          <button
            className={`navigation__menu-item-button navigation__menu-item-button_${props.savedNewsClass}`}
            onClick={props.onSavedArticlesClick}
          >
            Saved articles
          </button>
        </NavLink>
      </li>
    );
  }

  function createLogoutButton() {
    if (props.isLoggedIn) {
      return (
        <li>
          <NavLink
            className={`navigation__menu-item navigation__menu-item_${
              props.isMobileMenuOpen ? 'mobile' : ''
            }`}
            exact
            to='/'
          >
            <button
              className={`navigation__menu-item-button navigation__menu-item-button_${
                props.savedNewsClass
              } navigation__menu-item-button_user ${
                props.isLoggedIn
                  ? `circle-border circle-border_logged-in circle-border_${props.savedNewsClass}`
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
        <li>
          <NavLink
            className='navigation__menu-item navigation__menu-item_home '
            activeClassName='navigation__menu-item_active navigation__menu-item_active-white'
            exact
            to='/'
          >
            {' '}
            <button
              className={`navigation__menu-item-button navigation__menu-item-button_${props.savedNewsClass}`}
              onClick={props.onHomeClick}
            >
              Home
            </button>{' '}
          </NavLink>
        </li>

        {props.isLoggedIn ? createSavedArticlesButton() : createLoginButton()}

        {createLogoutButton()}
      </ul>

      <>
        <button
          className={`
            navigation__menu_mobile_button 
            navigation__menu_mobile_button_${props.savedNewsClass}
            navigation__menu_mobile_button_${
              props.isMobileMenuOpen || props.isPopupOpened ? 'opened' : ''
            }
            navigation__menu_mobile_button_${
              props.isMobileMenuOpen || props.isPopupOpened ? 'opened' : ''
            }_${props.savedNewsClass} 

          `}
          onClick={onMenuClick}
        ></button>

        {props.isMobileMenuOpen && (
          <div className='navigation__menu_mobile-underlay'>
            <ul
              className={`navigation__menu-list navigation__menu-list_mobile navigation__menu-list_mobile_${props.savedNewsClass}`}
            >
              <li>
                <NavLink
                  className={`navigation__menu-item navigation__menu-item_mobile navigation__menu-item_home navigation__menu-item_home_mobile`}
                  activeClassName='navigation__menu-item_active'
                  exact
                  to='/'
                >
                  {' '}
                  <button
                    className={`navigation__menu-item-button navigation__menu-item-button_${props.savedNewsClass}
                    navigation__menu-item-button_mobile`}
                    onClick={props.onHomeClick}
                  >
                    Home
                  </button>{' '}
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
