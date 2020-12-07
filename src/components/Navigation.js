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

  function viewSavedArticles() {}

  return (
    <ul className='navigation__menu-list'>
      <li className='navigation__menu-item navigation__menu-item_home '>
        <button className='navigation__menu-item_button'>Home</button>
      </li>

      <li
        className={`navigation__menu-item ${
          props.isLoggedIn ? 'navigation__menu-item_account' : ''
        }`}
      >
        <button
          className={`navigation__menu-item_button ${
            props.isLoggedIn ? '' : 'circle-border'
          }`}
          onClick={props.isLoggedIn ?  viewSavedArticles : props.onSignInClick}
        >
          {props.isLoggedIn ? 'Saved articles' : 'Sign In'}
        </button>
      </li>

      {props.isLoggedIn && (
        <li className='navigation__menu-item '>
          <button
            className={`navigation__menu-item_button navigation__menu-item_button_user ${
              props.isLoggedIn ? 'circle-border' : ''
            }`}
          >
            {currentUser} <span className='navigation__menu-item_logout'></span>
          </button>
        </li>
      )}
    </ul>
  );
}

export default Navigation;
