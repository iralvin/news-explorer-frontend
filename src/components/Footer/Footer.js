import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer(props) {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <p className='footer__copyright'>© 2020 Alvin Wong</p>
        <nav className='footer__nav-menu'>
          <ul className='footer__nav-menu_list'>
            <li className='footer__nav-menu_item'>
              <div className='footer__nav-menu-container footer__nav-menu-container_type_links'>
                <NavLink to='/'>
                  <button
                    className='footer__nav-menu_button footer__nav-menu_button_home'
                    onClick={props.onHomeClick}
                  >
                    Home
                  </button>{' '}
                </NavLink>{' '}
                <a
                  href='https://practicum.yandex.com/'
                  target='_blank'
                  className='footer__nav-menu_button footer__nav-menu_button_home'
                >
                  Practicum
                </a>
              </div>
            </li>

            <li className='footer__nav-menu_item'>
              <div className='footer__nav-menu-container footer__nav-menu-container_type_icons'>
                <a
                  href='https://github.com/'
                  target='_blank'
                  className='footer__nav-menu_button footer__nav-menu_button_home'
                >
                  <span className='footer__nav-menu_icon footer__nav-menu_icon_github'></span>
                </a>
                <a
                  href='https://facebook.com/'
                  target='_blank'
                  className='footer__nav-menu_button footer__nav-menu_button_home'
                >
                  <span className='footer__nav-menu_icon footer__nav-menu_icon_facebook'></span>
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
