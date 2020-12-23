import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SavedNews from '../SavedNews/SavedNews';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SigninPopup from '../SigninPopup/SigninPopup';
import SignupPopup from '../SignupPopup/SignupPopup';
import RegistrationSuccessful from '../RegistrationSucessful/RegistrationSuccessful';

import * as auth from '../../util/auth';
import api from '../../util/api';

import searchedArticlesData from '../../constants/searched-articles.json';
import savedArticlesData from '../../constants/saved-articles.json';

import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const [signinPopupIsOpen, setSigninPopupIsOpen] = React.useState(false);
  const [signupPopupIsOpen, setSignupPopupIsOpen] = React.useState(false);
  const [
    registrationSuccessPopupIsOpen,
    setRegistrationSuccessPopupIsOpen
  ] = React.useState(false);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isViewingSavedArticles, setIsViewingSavedArticles] = React.useState(
    false
  );

  const [query, setQuery] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [noArticlesFound, setNoArticlesFound] = React.useState(false);
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
    setRegistrationSuccessPopupIsOpen(false);
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
          // setIsLoggedIn(true);
          // closePopups();
          setSignupPopupIsOpen(false);
          setRegistrationSuccessPopupIsOpen(true);
          console.log('new user', data);
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
      auth.checkToken(token).then((user) => {
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
          console.log('user', user);
        }
      });
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
    console.log('article saved', article);
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      api
        .saveArticle(query, article, currentUser, token)
        .then((articleSaved) => {
          console.log(articleSaved);
          setSavedArticles([articleSaved, ...savedArticles]);
        })
        .catch((err) => {
          console.log('err saving card');
        });
    }
  }

  function onDeleteSavedArticle(articleToDelete) {
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
        })
        .catch((err) => {
          console.log('error deleting article');
        });
    }
  }

  function getInitialSavedArticles() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      api.getSavedArticles(currentUser, token).then((articles) => {
        if (articles) {
          setSavedArticles(articles);
        }
      });
    }
  }

  function onInputQueryChange(e) {
    setQuery(e.target.value);
  }

  function onSearch() {
    setIsSearching(true);
    setSearchedArticles([]);
    setNoArticlesFound(false);
    api
      .getNewsSearchedArticles(query)
      .then((data) => {
        console.log(data);
        if (data && data.articles.length <= 0) {
          setNoArticlesFound(true);
        }
        setSearchedArticles(data.articles);
        setIsSearching(false);
      })
      .catch((err) => {
        setIsSearching(false);
        setNoArticlesFound(true);
        console.log('error searching for articles');
      });
  }

  React.useEffect(() => {
    window.addEventListener('keyup', escapeKeyPressed);
    onPageLoad();
    getInitialSavedArticles();
  }, []);

  // React.useEffect(() => {
  //   let multiArray = [[], []];
  //   function testSortByCount() {
  //     const testNumArray = [1, 6, 20, 3, 3, 3, 20, 6, 4, 2, 6];
  //     const sortedNumArray = testNumArray.sort();
  //     console.log('sortedNumArray', sortedNumArray);

  //     const testAlphaArray = [
  //       'asdf',
  //       'fdsa',
  //       'fdsa',
  //       'asdf',
  //       'sdfa',
  //       'dsaf',
  //       'asdf',
  //       'dsaf',
  //       'sdfa',
  //       'sdfa',
  //       'sdfa',

  //     ];
  //     const sortedAlphaArray = testAlphaArray.sort();
  //     console.log('sortedAlphaArray', sortedAlphaArray);

  //     let temp;
  //     let count = 0;
  //     function foo(arr) {
  //       var a = [],
  //         b = [],
  //         prev;

  //       arr.sort();
  //       for (var i = 0; i < arr.length; i++) {
  //         if (arr[i] !== prev) {
  //           a.push(arr[i]);
  //           b.push(1);
  //         } else {
  //           b[b.length - 1]++;
  //         }
  //         prev = arr[i];
  //       }
  //       return [a, b];
  //     }
  //     console.log(foo(testAlphaArray));


  //     let prevValue;
  //     let objectCounts = {}
  //     function arrayCount() {
  //       for (let i = 0; i < sortedAlphaArray.length; i++) {
  //         if (!objectCounts.hasOwnProperty(sortedAlphaArray[i])){
  //           objectCounts[sortedAlphaArray[i]] = 1;
  //         }
  //         else {
  //           objectCounts[sortedAlphaArray[i]]++
  //         }
  //       }
  //       return objectCounts
  //     }
  //     console.log("arrayCount", arrayCount())
  //   }
  //   testSortByCount();
  // }, []);

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

        <RegistrationSuccessful
          isOpened={registrationSuccessPopupIsOpen}
          closePopup={closePopups}
          flairTextClick={() => {
            closePopups();
            openSigninPopup();
          }}
        />

        <Switch>
          <Route exact path='/'>
            <Main
              onInputQueryChange={(e) => {
                onInputQueryChange(e);
              }}
              isSearching={isSearching}
              noArticlesFound={noArticlesFound}
              onSearch={(query) => {
                onSearch(query);
              }}
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
