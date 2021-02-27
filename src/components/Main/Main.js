import React from 'react';

import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../NothingFound/NothingFound';
import NewsCardsList from '../NewsCardsList/NewsCardsList';
import About from '../About/About';

function Main(props) {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [inputValidity, setInputValidity] = React.useState(false);

  const inputRef = React.createRef();

  function onSubmit(e) {
    e.preventDefault();
    if (inputRef.current.value.length === 0) {
      setErrorMessage('Please enter keyword');
    } else {
      setErrorMessage('');
      props.onSearch();
    }
  }

  function handleOnInputChange(e) {
    if (inputRef.current.value.length <= 0) {
      setInputValidity(false);
    } else if (inputRef.current.value.length > 0) {
      setInputValidity(true);
    }

    props.onInputQueryChange(e);
  }

  return (
    <>
      <div className='main'>
        <Header
          onHomeClick={props.onHomeClick}
          isPopupOpened={props.isPopupOpened}
          closePopups={props.closePopups}
          onLogout={props.onLogout}
          onSignInClick={props.onSignInClick}
          isLoggedIn={props.isLoggedIn}
          onSavedArticlesClick={props.onSavedArticlesClick}
        />

        <div className='main__title-container'>
          <h1 className='main__title'>What's going on in the world?</h1>
          <p className='main__subtitle'>
            Find the latest news on any topic and save them in your personal
            account.
          </p>
        </div>
        <div className='main__search-container'>
          <form action='' className='main__search-form' onSubmit={onSubmit}>
            <input
              ref={inputRef}
              onChange={handleOnInputChange}
              type='text'
              className='main__search-input'
              placeholder='Enter topic'
            />

            <button
              className={`main__search-button ${
                inputValidity ? '' : 'main__search-button_disabled'
              }`}
              disabled={!inputValidity}
            >
              Search
            </button>
          </form>
          <span>{errorMessage}</span>
        </div>
      </div>

      {props.isSearching && <Preloader />}
      {props.noArticlesFound && (
        <NothingFound
          title='Nothing found'
          text='Sorry, but nothing matched your search terms.'
        />
      )}
      {props.searchError && (
        <NothingFound
          title='Search error'
          text='Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.'
        />
      )}

      {props.data.length > 0 && (
        <NewsCardsList
          data={props.data}
          isLoggedIn={props.isLoggedIn}
          savedArticles={props.savedArticles}
          onSaveArticle={(article) => {
            props.onSaveArticle(article);
          }}
          onDeleteSavedArticle={(article) => {
            props.onDeleteSavedArticle(article);
          }}
        />
      )}

      <About />
    </>
  );
}

export default Main;
