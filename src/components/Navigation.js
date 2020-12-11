import React from 'react';
import { NavLink } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Navigation(props) {
  const currentUser = React.useContext(CurrentUserContext);

  //   React.useEffect(() => {
  //     function loggedInTest() {
  //       console.log(props.isLoggedIn);
  //       console.log('user logged in, test from nav component');
  //     }
  //     loggedInTest();
  //   }, [props.IsLoggedIn]);

  function loginButton() {
    return (
      <button
        className={`navigation__menu-item_button navigation__menu-item_button_${props.savedNewsClass} circle-border`}
        onClick={props.onSignInClick}
      >
        Sign In
      </button>
    );
  }

  function savedArticlesButton() {
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

  return (
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
        {props.isLoggedIn ? savedArticlesButton() : loginButton()}
        {/* <button
          className={`navigation__menu-item_button navigation__menu-item_button_${
            props.savedNewsClass
          } ${props.isLoggedIn ? '' : 'circle-border'}`}
          onClick={props.isLoggedIn ? viewSavedArticles : props.onSignInClick}
        >
          {props.isLoggedIn ? 'Saved articles' : 'Sign In'}
        </button> */}
      </li>

      {props.isLoggedIn && (
        <li className='navigation__menu-item '>
          <NavLink to='/'>
            <button
              className={`navigation__menu-item_button navigation__menu-item_button_${
                props.savedNewsClass
              } navigation__menu-item_button_user ${
                props.isLoggedIn
                  ? `circle-border circle-border_${props.savedNewsClass}`
                  : ''
              }`}
              onClick={props.onLogout}
            >
              {currentUser}{' '}
              <span
                className={`navigation__menu-item_logout navigation__menu-item_logout_${props.savedNewsClass}`}
              ></span>
            </button>
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default Navigation;
