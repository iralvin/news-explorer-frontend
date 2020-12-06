import React from "react";

function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer__copyright">© 2020 Alvin Wong</p>
        <nav className="footer__nav-menu">
            <ul className="footer__nav-menu-list">
                <li className="footer__nav-menu-item">
                    Home
                </li>
                <li className="footer__nav-menu-item">
                    Practicum
                </li>
                <li className="footer__nav-menu-item">
                    (github icon)
                </li>
            </ul>
        </nav>
      </div>
    </footer>
  );
}
export default Footer;
