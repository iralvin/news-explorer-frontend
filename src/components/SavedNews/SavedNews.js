import React from 'react';

import Header from '../Header/Header';
import NewsCardsList from '../NewsCardsList/NewsCardsList';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedNews(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const keywordsSet = new Set();
  let keywordsArray;
  let slicedKeywordArray;

  // function setKeywords() {
  //   props.data.forEach((article) => {
  //     if (!keywordsSet.has(article.keyword)) {
  //       keywordsSet.add(article.keyword);
  //     }
  //   });

  //   keywordsArray = Array.from(keywordsSet);

  //   if (keywordsArray.length > 2) {
  //     splicedKeywordArray = keywordsArray.splice(0, 2);
  //   }
  //   console.log('keywordsarray', keywordsArray);
  //   console.log('spliedarray', splicedKeywordArray);
  // }

  function displayKeywords() {
    props.data.forEach((article) => {
      if (!keywordsSet.has(article.keyword)) {
        keywordsSet.add(article.keyword.charAt(0).toUpperCase() + article.keyword.substr(1));
      }
    });

    keywordsArray = Array.from(keywordsSet);
    console.log('keywordsarray', keywordsArray);

    if (keywordsArray.length > 2) {
      slicedKeywordArray = keywordsArray.slice(0, 2);
    }
    console.log('spliedarray', slicedKeywordArray);

    console.log('keywordsarray', keywordsArray);
    if (keywordsArray.length > 2) {
      return `${slicedKeywordArray.join(', ')}, and ${
        keywordsArray.length - 2
      } others`;
    } else {
      return `${keywordsArray.join(' and ')}`;
    }
  }

  // React.useEffect(() => {
  //   setKeywords();
  // }, []);

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
          {`${currentUser.name}, you have ${props.data.length} articles saved`}
        </p>
        <p className='saved-news__subheader_text saved-news__subheader_text_keywords'>
          By keywords:{' '}
          <span className='saved-news__subheader_text_keywords_bold'>
            {/* {keywordsArray.length > 2
              ? `${splicedKeywordArray.join(', ')}, and ${
                  keywordsArray.length - 2
                } other`
              : `${keywordsArray.join(', ')}`} */}
            {displayKeywords()}
          </span>
        </p>
      </div>

      {/* <NewsCardsList /> // needto pass in card data for the articles that were saved*/}
    </div>
  );
}

export default SavedNews;
