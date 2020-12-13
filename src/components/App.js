import React from 'react';
import { Route, Switch } from 'react-router-dom';

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

import searchedArticlesData from '../constants/searched-articles.json';
import savedArticlesData from '../constants/saved-articles.json';

import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [signinPopupIsOpen, setSigninPopupIsOpen] = React.useState(false);
  const [signupPopupIsOpen, setSignupPopupIsOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isViewingSavedArticles, setIsViewingSavedArticles] = React.useState(
    false
  );
  const [searchedArticles, setSearchedArticles] = React.useState([]);
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

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
  function onLogin() {
    console.log('app form submit');
    setIsLoggedIn(true);
    closePopups();
  }
  function onRegister(email, name) {
    setCurrentUser({
      email,
      name
    });
    setIsLoggedIn(true);
    closePopups();
  }

  function onLogout() {
    setIsLoggedIn(false);
  }

  function viewSavedArticles() {
    console.log('view saved articles');
    setIsViewingSavedArticles(true);
  }

  function viewHomePage() {
    setIsViewingSavedArticles(false);
  }

  function onSaveArticleClick(article) {
    console.log('article', article);
    console.log('saving article to saved articles database');
    setSavedArticles([article, ...savedArticles]);
    // must get article data from article card
  }

  function onDeleteSavedArticle(articleToDelete) {
    console.log('delete saved article');
    const tempSavedArticles = savedArticles.filter((article) => {
      if (article !== articleToDelete) {
        return article;
      }
    });
    setSavedArticles(tempSavedArticles);
  }

  React.useEffect(() => {
    window.addEventListener('keyup', escapeKeyPressed);
    setSearchedArticles(searchedArticlesData);
    setSavedArticles(savedArticlesData);
  }, []);

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>
        <SigninPopup
          onSubmit={onLogin}
          isOpened={signinPopupIsOpen}
          closePopup={closePopups}
          flairTextClick={flairTextClick}
        />
        <SignupPopup
          onSubmit={(email, name) => {onRegister(email, name)}}
          isOpened={signupPopupIsOpen}
          closePopup={closePopups}
          flairTextClick={flairTextClick}
        />

        {/* <Header onSignInClick={openSigninPopup} isLoggedIn={isLoggedIn} /> */}

        <Switch>
          <Route exact path='/'>
            {/* ROUTE FOR HOME PAGE */}
            <Hero
              onLogout={onLogout}
              onSignInClick={openSigninPopup}
              isLoggedIn={isLoggedIn}
              onSavedArticlesClick={viewSavedArticles}
            />
            <NewsCardsList
              data={searchedArticles}
              isLoggedIn={isLoggedIn}
              savedArticles={savedArticles}
              onSaveArticle={(article) => {
                onSaveArticleClick(article);
              }}
              onDeleteSavedArticle={() => {}}
            />
            <About />
            {/* CLOSE ROUTE FOR HOME PAGE */}
          </Route>

          <Route path='/saved'>
            {/* ROUTE FOR SAVED ARTICLES */}
            <SavedNewsHeader
              onLogout={onLogout}
              isLoggedIn={isLoggedIn}
              onHomeClick={viewHomePage}
            />
            <NewsCardsList
              data={savedArticles}
              isLoggedIn={isLoggedIn}
              isViewingSavedArticles={isViewingSavedArticles}
              onSaveArticle={() => {}}
              onDeleteSavedArticle={(article) => {
                onDeleteSavedArticle(article);
              }}
            />
          </Route>

          {/* CLOSE ROUTE FOR SAVED ARTICLES */}
        </Switch>

        {/* <Preloader /> */}
        {/* <NothingFound /> */}
        <Footer onHomeClick={viewHomePage} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
