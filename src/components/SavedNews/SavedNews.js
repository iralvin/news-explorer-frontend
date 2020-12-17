import React from 'react';

import Header from '../Header/Header';
import NewsCardsList from '../NewsCardsList/NewsCardsList';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedNews(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [keywordsToPrint, setKeywordsToPrint] = React.useState('');

  let keywordsSet;
  let keywordsArray;
  let slicedKeywordsArray;

  function setKeywords() {
    keywordsSet = new Set();

    props.data.forEach((article) => {
      if (!keywordsSet.has(article.keyword)) {
        keywordsSet.add(
          article.keyword.charAt(0).toUpperCase() + article.keyword.substr(1)
        );
      }
    });

    keywordsArray = Array.from(keywordsSet);
  }

  function displayKeywords() {
    if (keywordsArray.length > 2) {
      slicedKeywordsArray = keywordsArray.slice(0, 2);

      setKeywordsToPrint(
        `${slicedKeywordsArray.join(', ')}, and ${
          keywordsArray.length - 2
        } others`
      );
    } else {
      setKeywordsToPrint(`${keywordsArray.join(' and ')}`);
    }
  }

  React.useEffect(() => {
    setKeywords();
    displayKeywords();
  }, [props.data]);

  return (
    <>
      <div className='saved-news'>
        <Header
          isPopupOpened={props.isPopupOpened}
          closePopups={props.closePopups}
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
              {keywordsToPrint}
            </span>
          </p>
        </div>
      </div>

      <NewsCardsList
        isViewingSavedArticles={props.isViewingSavedArticles}
        onSaveArticle={(article) => {
          props.onSaveArticle(article);
        }}
        onDeleteSavedArticle={(article) => {
          props.onDeleteSavedArticle(article);
        }}
        data={props.data}
        isLoggedIn={props.isLoggedIn}
      />
    </>
  );
}

export default SavedNews;
