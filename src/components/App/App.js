import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNews from '../SavedNews/SavedNews';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SigninPopup from '../SigninPopup/SigninPopup';
import SignupPopup from '../SignupPopup/SignupPopup';
import RegistrationSuccessful from '../RegistrationSucessful/RegistrationSuccessful';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import * as auth from '../../util/auth';
import api from '../../util/api';

import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const [signinPopupIsOpen, setSigninPopupIsOpen] = React.useState(false);
  const [signupPopupIsOpen, setSignupPopupIsOpen] = React.useState(false);
  const [
    registrationSuccessPopupIsOpen,
    setRegistrationSuccessPopupIsOpen
  ] = React.useState(false);
  const [
    confirmDeletePopupIsOpen,
    setConfirmDeletePopupIsOpen
  ] = React.useState(false);
  const [articleToDelete, setArticleToDelete] = React.useState({});

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isViewingSavedArticles, setIsViewingSavedArticles] = React.useState(
    false
  );

  const [query, setQuery] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [noArticlesFound, setNoArticlesFound] = React.useState(false);
  const [searchError, setSearchError] = React.useState(false);
  const [searchedArticles, setSearchedArticles] = React.useState([]);

  const [savedArticles, setSavedArticles] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  function openSigninPopup() {
    setSigninPopupIsOpen(true);
  }

  // function openSignupPopup() {
  //   setSignupPopupIsOpen(true);
  // }

  function switchSigninSignup() {
    setSigninPopupIsOpen(!signinPopupIsOpen);
    setSignupPopupIsOpen(!signupPopupIsOpen);
  }

  function closePopups() {
    setSigninPopupIsOpen(false);
    setSignupPopupIsOpen(false);
    setRegistrationSuccessPopupIsOpen(false);
    setConfirmDeletePopupIsOpen(false);
  }

  function escapeKeyPressed(e) {
    if (e.key === 'Escape') {
      closePopups();
    }
  }
  function onLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        if (data) {
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
          setSignupPopupIsOpen(false);
          setRegistrationSuccessPopupIsOpen(true);
          return;
        }
        return Promise.reject();
      })
      .catch((err) => {
        console.log('failed to create user');
      });
  }

  function onPageLoad() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth
        .checkToken(token)
        .then((user) => {
          if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
          }
        })
        .catch((err) => {
          console.log('failed to get user');
        });
    }

    if (localStorage.getItem('searchedArticles')) {
      setSearchedArticles(JSON.parse(localStorage.getItem('searchedArticles')));
      setQuery(localStorage.getItem('keyword'));
    }
  }

  function onLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  function viewSavedArticles() {
    setIsViewingSavedArticles(true);
  }

  function viewHomePage() {
    setIsViewingSavedArticles(false);
  }

  function onSaveArticleClick(article) {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      api
        .saveArticle(query, article, currentUser, token)
        .then((articleSaved) => {
          setSavedArticles([articleSaved, ...savedArticles]);
        })
        .catch((err) => {
          console.log('err saving card');
        });
    }
  }

  // let articleToDelete;
  function confirmDeleteArticle(article) {
    setConfirmDeletePopupIsOpen(true);
    setArticleToDelete(article);
    console.log(articleToDelete);
    console.log(currentUser);
  }

  function onDeleteSavedArticle() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      api
        .deleteArticle(articleToDelete, currentUser, token)
        .then((res) => {
          const tempSavedArticles = savedArticles.filter((article) => {
            if (article._id !== articleToDelete._id) {
              return article;
            }
          });
          setSavedArticles(tempSavedArticles);
          closePopups();
        })
        .catch((err) => {
          console.log('error deleting article');
        });
    }
  }

  function getInitialSavedArticles() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      api
        .getSavedArticles(currentUser, token)
        .then((articles) => {
          if (articles) {
            setSavedArticles(articles);
          }
        })
        .catch((err) => {
          console.log('failed to get saved articles');
        });
    }
  }

  function onInputQueryChange(e) {
    setQuery(e.target.value);
  }

  function onSearch() {
    setSearchedArticles([]);
    setIsSearching(true);
    setNoArticlesFound(false);
    setSearchError(false);
    api
      .getNewsSearchedArticles(query)
      .then((data) => {
        if (data && data.articles.length <= 0) {
          setNoArticlesFound(true);
        }
        setSearchedArticles(data.articles);
        setIsSearching(false);
      })
      .catch((err) => {
        setIsSearching(false);
        setNoArticlesFound(false);
        setSearchError(true);
        console.log('error searching for articles');
      });
  }

  function storeSearchedArticles(articles) {
    localStorage.setItem('searchedArticles', JSON.stringify(articles));
    localStorage.setItem('keyword', query);
  }

  React.useEffect(() => {
    onPageLoad();
    getInitialSavedArticles();

    window.addEventListener('keyup', escapeKeyPressed);
  }, []);

  React.useEffect(() => {
    storeSearchedArticles(searchedArticles);
  }, [searchedArticles]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Switch>
          <ProtectedRoute
            path='/saved'
            openSigninPopup={openSigninPopup}
            component={SavedNews}
            isPopupOpened={signinPopupIsOpen || signupPopupIsOpen}
            closePopups={closePopups}
            onLogout={onLogout}
            isLoggedIn={isLoggedIn}
            onHomeClick={viewHomePage}
            data={savedArticles}
            isViewingSavedArticles={true}
            onSaveArticle={(article) => {
              onSaveArticleClick(article);
            }}
            onDeleteSavedArticle={(article) => {
              confirmDeleteArticle(article);
            }}
          />

          <Route exact path='/'>
            <Main
              onInputQueryChange={(e) => {
                onInputQueryChange(e);
              }}
              isSearching={isSearching}
              noArticlesFound={noArticlesFound}
              searchError={searchError}
              onSearch={(query) => {
                onSearch(query);
              }}
              isPopupOpened={signinPopupIsOpen || signupPopupIsOpen || registrationSuccessPopupIsOpen || confirmDeletePopupIsOpen}
              closePopups={closePopups}
              onLogout={onLogout}
              onSignInClick={openSigninPopup}
              isLoggedIn={isLoggedIn}
              onSavedArticlesClick={viewSavedArticles}
              data={searchedArticles}
              savedArticles={savedArticles}
              onSaveArticle={(article) => {
                if (!isLoggedIn) {
                  openSigninPopup();
                } else {
                  onSaveArticleClick(article);
                }
              }}
              onDeleteSavedArticle={(article) => {
                onDeleteSavedArticle(article);
              }}
            />
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>

        <Footer onHomeClick={viewHomePage} />
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

        <RegistrationSuccessful
          isOpened={registrationSuccessPopupIsOpen}
          closePopup={closePopups}
          flairTextClick={() => {
            closePopups();
            openSigninPopup();
          }}
        />

        <ConfirmDelete
          isOpened={confirmDeletePopupIsOpen}
          closePopup={closePopups}
          onSubmit={onDeleteSavedArticle}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
