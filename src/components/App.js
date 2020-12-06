import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import Header from './Header';
import Hero from './Hero';
import Preloader from './Preloader';
import NewsCardsList from './NewsCardsList';
import About from './About';
import Footer from './Footer';
import SigninPopup from './SigninPopup';
import SignupPopup from './SignupPopup';
import PopupWithForm from './PopupWithForm';

function App() {
  const [signinPopupIsOpen, setSigninPopupIsOpen] = React.useState(false);
  const [signupPopupIsOpen, setSignupPopupIsOpen] = React.useState(false);

  function openSigninPopup() {
    setSigninPopupIsOpen(true);
  }

  function openSignupPopup() {
    setSignupPopupIsOpen(true);
  }

  function flairTextClick() {
    console.log('swapped sign in / sign up');
    setSigninPopupIsOpen(!signinPopupIsOpen);
    setSignupPopupIsOpen(!signupPopupIsOpen);
  }

  function closePopups() {
    setSigninPopupIsOpen(false);
    setSignupPopupIsOpen(false);
  }

  function escapeKeyPressed(e) {
    if (e.key === 'Escape') {
      console.log('pressed escape key');
      closePopups();
    }
  }

  React.useEffect(() => {
    window.addEventListener('keyup', escapeKeyPressed);
  }, []);

  return (
    <div className='App'>
      {/* <Header /> */}
      <SigninPopup
        isOpened={signinPopupIsOpen}
        closePopup={closePopups}
        flairTextClick={flairTextClick}
      />
      <SignupPopup
        isOpened={signupPopupIsOpen}
        closePopup={closePopups}
        flairTextClick={flairTextClick}
      />
      <Hero onSignInClick={openSigninPopup} />
      <Preloader />
      <NewsCardsList />
      <About />
      <Footer />

      {/*       
      <Header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </Header> */}
    </div>
  );
}

export default App;
