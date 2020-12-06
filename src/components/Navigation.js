import React from 'react';

function Navigation(props) {
  return (
    <ul className='navigation__menu-list'>
      <li className='navigation__menu-item navigation__menu-item_home'>Home</li>
      <li
        className='navigation__menu-item navigation__menu-item_account'
        onClick={props.onSignInClick}
      >
        Sign In
      </li>
    </ul>
  );
}

export default Navigation;
