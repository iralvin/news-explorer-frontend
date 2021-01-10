import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer(props) {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__copyright'>© 2020 Alvin Wong</p>
        <nav className='footer__nav-menu'>
          <ul className='footer__nav-menu-list'>
            <li className='footer__nav-menu-item'>
              <div className='footer__nav-menu-container footer__nav-menu-container_type_links'>
                <NavLink to='/'>
                  <button
                    className='footer__nav-menu-button footer__nav-menu-button_home'
                    onClick={props.onHomeClick}
                  >
                    Home
                  </button>{' '}
                </NavLink>{' '}
                <a
                  href='https://practicum.yandex.com/'
                  target='_blank'
                  className='footer__nav-menu-button footer__nav-menu-button_practicum'
                >
                  Practicum
                </a>
              </div>
            </li>

            <li className='footer__nav-menu-item'>
              <div className='footer__nav-menu-container footer__nav-menu-container_type_icons'>
                <a
                  href='https://github.com/iralvin'
                  target='_blank'
                  className='footer__nav-menu-button footer__nav-menu-button_github'
                >
                  <span className='footer__nav-menu-icon footer__nav-menu-icon_github'></span>
                </a>
                <a
                  href='https://facebook.com/'
                  target='_blank'
                  className='footer__nav-menu-button footer__nav-menu-button_facebook'
                >
                  <span className='footer__nav-menu-icon footer__nav-menu-icon_facebook'></span>
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
export default Footer;
