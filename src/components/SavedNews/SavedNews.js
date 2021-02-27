import React from 'react';

import Header from '../Header/Header';
import NewsCardsList from '../NewsCardsList/NewsCardsList';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedNews(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [keywordsToPrint, setKeywordsToPrint] = React.useState('');

  const [sortedKeywordsArray, setSortedKeywordsArray] = React.useState([]);
  const [keyCounts, setKeyCounts] = React.useState([]);
  const [sortedKeyCounts, setSortedKeyCounts] = React.useState([]);

  let keywordsArray = [];
  let slicedKeywordsArray = [];
  let keywordCounts = [];

  function setKeywords() {
    props.data.forEach((article) => {
      keywordsArray.push(article.keyword);
    });
    setSortedKeywordsArray(keywordsArray.sort());
  }

  function countKeywords() {
    sortedKeywordsArray.forEach((keyword) => {
      let currentIndex;
      const foundIndex = keywordCounts.some((e, index) => {
        if (Object.values(e).includes(keyword)) {
          currentIndex = index;
          return true;
        }
      });

      if (foundIndex) {
        keywordCounts[currentIndex].count++;
      } else {
        keywordCounts.push({
          keyword: keyword,
          count: 1
        });
      }
    });
    setKeyCounts(keywordCounts);
  }

  function sortCountedKeywords() {
    setSortedKeyCounts(
      keyCounts.sort((a, b) => {
        return b.count - a.count;
      })
    );
  }

  function displayKeywords() {
    if (sortedKeyCounts.length > 3) {
      for (let i = 0; i < 2; i++) {
        slicedKeywordsArray.push(sortedKeyCounts[i].keyword);
      }
      setKeywordsToPrint(
        `${slicedKeywordsArray.join(', ')}, and ${
          sortedKeyCounts.length - 2
        } others`
      );
    } else {
      const lf = new Intl.ListFormat('en');

      for (let i = 0; i < sortedKeyCounts.length; i++) {
        slicedKeywordsArray.push(sortedKeyCounts[i].keyword);
      }
      setKeywordsToPrint(`${lf.format(slicedKeywordsArray)}`);
    }
  }

  React.useEffect(() => {
    setKeywords();
  }, [props.data]);

  React.useEffect(() => {
    countKeywords();
  }, [sortedKeywordsArray]);

  React.useEffect(() => {
    sortCountedKeywords();
  }, [keyCounts]);

  React.useEffect(() => {
    if (sortedKeyCounts.length > 0) {
      displayKeywords();
    }
  }, [sortedKeyCounts]);

  return (
    <>
      <div className='saved-news'>
        <Header
          onHomeClick={props.onHomeClick}
          isPopupOpened={props.isPopupOpened}
          closePopups={props.closePopups}
          onLogout={props.onLogout}
          savedNewsClass='saved-news'
          isLoggedIn={props.isLoggedIn}
          onHomeClick={props.onHomeClick}
        />
        <div className='saved-news__subheader-container'>
          <p className='saved-news__subheader saved-news__subheader_text_title'>
            Saved articles
          </p>
          <p className='saved-news__subheader saved-news__subheader_text_descriptor'>
            {`${currentUser.name}, you have ${props.data.length} articles saved`}
          </p>
          <p className='saved-news__subheader saved-news__subheader_text_keywords'>
            By keywords:{' '}
            <span className='saved-news__subheader saved-news__subheader_text_keywords_bold'>
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
