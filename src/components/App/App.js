import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SavedNews from '../SavedNews/SavedNews';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SigninPopup from '../SigninPopup/SigninPopup';
import SignupPopup from '../SignupPopup/SignupPopup';
import * as auth from '../../util/auth';

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
  function onLogin(email, password) {
    console.log('app form submit');
    auth
      .login(email, password)
      .then((data) => {
        console.log('data', data);
        if (data) {
          console.log('successful login');
          console.log('data', data);
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          closePopups();
          return;
        }
        return Promise.reject();
      })
      .catch((err) => {
        console.log('error logging in');
      });
  }

  function onRegister(email, password, name) {
    auth
      .register(email, password, name)
      .then((data) => {
        if (data) {
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          closePopups();
          console.log('new user', data);
          return;
        }
        return Promise.reject();
      })
      .catch((err) => {
        console.log('failed to create user');
      });
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
          onSubmit={(email, password) => {
            onLogin(email, password);
          }}
          isOpened={signinPopupIsOpen}
          closePopup={closePopups}
          flairTextClick={switchSigninSignup}
        />
        <SignupPopup
          onSubmit={(email, password, name) => {
            onRegister(email, password, name);
          }}
          isOpened={signupPopupIsOpen}
          closePopup={closePopups}
          flairTextClick={switchSigninSignup}
        />

        <Switch>
          <Route exact path='/'>
            <Main
              isPopupOpened={signinPopupIsOpen || signupPopupIsOpen}
              closePopups={closePopups}
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
              isPopupOpened={signinPopupIsOpen || signupPopupIsOpen}
              closePopups={closePopups}
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
