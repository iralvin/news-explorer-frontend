import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import Header from './Header';
import SavedNewsHeader from './SavedNewsHeader';
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
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

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
  function onSubmit() {
    setIsLoggedIn(true);
  }

  React.useEffect(() => {
    window.addEventListener('keyup', escapeKeyPressed);
  }, []);

  return (
    <div className='App'>
      <SigninPopup
        onSubmit={onSubmit}
        isOpened={signinPopupIsOpen}
        closePopup={closePopups}
        flairTextClick={flairTextClick}
      />
      <SignupPopup
        isOpened={signupPopupIsOpen}
        closePopup={closePopups}
        flairTextClick={flairTextClick}
      />

      {/* <SavedNewsHeader /> */}
      <Header onSignInClick={openSigninPopup}/>

      <Hero  />
      <Preloader />
      <NewsCardsList />
      <About />
      <Footer />
    </div>
  );
}

export default App;
