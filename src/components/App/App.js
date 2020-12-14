import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SavedNews from '../SavedNews/SavedNews';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SigninPopup from '../SigninPopup/SigninPopup';
import SignupPopup from '../SignupPopup/SignupPopup';

import searchedArticlesData from '../../constants/searched-articles.json';
import savedArticlesData from '../../constants/saved-articles.json';

import CurrentUserContext from '../../contexts/CurrentUserContext';

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

  function switchSigninSignup() {
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
    setIsViewingSavedArticles(true);
  }

  function viewHomePage() {
    setIsViewingSavedArticles(false);
  }

  function onSaveArticleClick(article) {
    setSavedArticles([article, ...savedArticles]);
  }

  function onDeleteSavedArticle(articleToDelete) {
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
          flairTextClick={switchSigninSignup}
        />
        <SignupPopup
          onSubmit={(email, name) => {
            onRegister(email, name);
          }}
          isOpened={signupPopupIsOpen}
          closePopup={closePopups}
          flairTextClick={switchSigninSignup}
        />

        <Switch>
          <Route exact path='/'>
            <Main
              onLogout={onLogout}
              onSignInClick={openSigninPopup}
              isLoggedIn={isLoggedIn}
              onSavedArticlesClick={viewSavedArticles}
              data={searchedArticles}
              isLoggedIn={isLoggedIn}
              savedArticles={savedArticles}
              onSaveArticle={(article) => {
                onSaveArticleClick(article);
              }}
              onDeleteSavedArticle={(article) => {
                onDeleteSavedArticle(article);
              }}
            />
          </Route>

          <Route path='/saved'>
            <SavedNews
              onLogout={onLogout}
              isLoggedIn={isLoggedIn}
              onHomeClick={viewHomePage}
              data={savedArticles}
              isViewingSavedArticles={isViewingSavedArticles}
              onSaveArticle={(article) => {
                onSaveArticleClick(article);
              }}
              onDeleteSavedArticle={(article) => {
                onDeleteSavedArticle(article);
              }}
            />
          </Route>
        </Switch>

        <Footer onHomeClick={viewHomePage} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
