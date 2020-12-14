import React from 'react';

import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../NothingFound/NothingFound';
import NewsCardsList from '../NewsCardsList/NewsCardsList';
import About from '../About/About';

function Main(props) {
  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className='main'>
        <Header
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
              type='text'
              className='main__search-input'
              placeholder='Enter topic'
            />
            <button className='main__search-button'>Search</button>
          </form>
        </div>
      </div>

      {/* <Preloader />
      <NothingFound /> */}

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
      <About />
    </>
  );
}

export default Main;
