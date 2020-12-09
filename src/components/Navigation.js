import React from 'react';
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
      <button
        className={`navigation__menu-item_button navigation__menu-item_button_${props.savedNewsClass}`}
        onClick={viewSavedArticles}
      >
        Saved articles
      </button>
    );
  }

  function viewSavedArticles() {
    console.log('view saved articles');
  }

  return (
    <ul className='navigation__menu-list'>
      <li className='navigation__menu-item navigation__menu-item_home '>
        <button
          className={`navigation__menu-item_button navigation__menu-item_button_${props.savedNewsClass}`}
        >
          Home
        </button>
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
          <button
            className={`navigation__menu-item_button navigation__menu-item_button_${
              props.savedNewsClass
            } navigation__menu-item_button_user ${
              props.isLoggedIn
                ? `circle-border circle-border_${props.savedNewsClass}`
                : ''
            }`}
          >
            {currentUser}{' '}
            <span
              className={`navigation__menu-item_logout navigation__menu-item_logout_${props.savedNewsClass}`}
            ></span>
          </button>
        </li>
      )}
    </ul>
  );
}

export default Navigation;
