import React from 'react';
import { Route, Switch } from 'react-router';

import logo from '../logo.svg';
import '../App.css';

import Header from './Header';
import SavedNewsHeader from './SavedNewsHeader';
import Hero from './Hero';
import Preloader from './Preloader';
import NothingFound from './NothingFound';
import NewsCardsList from './NewsCardsList';
import About from './About';
import Footer from './Footer';
import SigninPopup from './SigninPopup';
import SignupPopup from './SignupPopup';
import PopupWithForm from './PopupWithForm';

import searchedArticles from '../constants/searched-articles.json';

import CurrentUserContext from '../contexts/CurrentUserContext';

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
    console.log('app form submit');

    setIsLoggedIn(true);
    closePopups();
  }

  React.useEffect(() => {
    window.addEventListener('keyup', escapeKeyPressed);
  }, []);

  return (
    <div className='App'>
      <CurrentUserContext.Provider value='temp name'>
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

        {/* <Header onSignInClick={openSigninPopup} isLoggedIn={isLoggedIn} /> */}

        <Switch>
          <Route exact path='/'>
            {/* ROUTE FOR HOME PAGE */}
            <Hero onSignInClick={openSigninPopup} isLoggedIn={isLoggedIn} />
            <NewsCardsList data={searchedArticles} isLoggedIn={isLoggedIn} />
            <About />
            {/* CLOSE ROUTE FOR HOME PAGE */}
          </Route>

          <Route path='/saved'>
            {/* ROUTE FOR SAVED ARTICLES */}
            <SavedNewsHeader isLoggedIn={isLoggedIn}/>
            <NewsCardsList data={searchedArticles} isLoggedIn={isLoggedIn}/>
          </Route>

          {/* CLOSE ROUTE FOR SAVED ARTICLES */}
        </Switch>

        {/* <Preloader /> */}
        {/* <NothingFound /> */}
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
