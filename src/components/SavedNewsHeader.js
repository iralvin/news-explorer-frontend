import React from 'react';

import Header from './Header';
import NewsCardsList from './NewsCardsList';

function SavedNewsHeader(props) {
  // pass context of user to here to reference for name

  return (
    <div className='saved-news'>
      <Header
        onLogout={props.onLogout}
        savedNewsClass='saved-news'
        isLoggedIn={props.isLoggedIn}
        onHomeClick={props.onHomeClick}
      />
      <div className='saved-news__subheader-container'>
        <p className='saved-news__subheader_text saved-news__subheader_text_title'>
          Saved articles
        </p>
        <p className='saved-news__subheader_text saved-news__subheader_text_descriptor'>
          asdfasdf placeholder
        </p>
        <p className='saved-news__subheader_text saved-news__subheader_text_keywords'>
          keywords placeholder
        </p>
      </div>

      {/* <NewsCardsList /> // needto pass in card data for the articles that were saved*/}
    </div>
  );
}

export default SavedNewsHeader;
