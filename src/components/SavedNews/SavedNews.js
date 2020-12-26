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
  // let keywordsSet;
  // let sortedKeywordsArray;

  // let prevValue;
  let keywordsArray = [];
  let slicedKeywordsArray = [];
  let objectCounts = {};
  let keywordCounts = [];

  function setKeywords() {
    // arrayCounts = [{}];

    props.data.forEach((article) => {
      keywordsArray.push(article.keyword);

      // if (!objectCounts.hasOwnProperty(article.keyword)) {
      //   objectCounts[article.keyword] = 1;
      // } else {
      //   objectCounts[article.keyword]++;
      // }
    });
    setSortedKeywordsArray(keywordsArray.sort());

    // return objectCounts;
  }

  function countKeywords() {
    sortedKeywordsArray.forEach((keyword) => {
      console.log('BEGIN - iterating through keywords', keyword);
      let currentIndex;
      const foundIndex = keywordCounts.some((e, index) => {
        console.log('MIDDLE - iterating through object', e);
        console.log(
          'Object.values(e).includes(keyword)',
          Object.values(e).includes(keyword)
        );
        if (Object.values(e).includes(keyword)) {
          console.log('keyword MATCHED in array');
          currentIndex = index;
          console.log('currentIndex MATCHED', currentIndex, index);

          return true;
        }
      });
      console.log('MIDDLE - check if keyword found');
      console.log(foundIndex);

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
    // if (Object.keys(objectCounts).length > 2) {
    //   slicedKeywordsArray = Object.keys(objectCounts).slice(0, 2);
    //   setKeywordsToPrint(
    //     `${slicedKeywordsArray.join(', ')}, and ${
    //       Object.keys(objectCounts).length - 2
    //     } others`
    //   );
    // } else {
    //   setKeywordsToPrint(`${Object.keys(objectCounts).join(' and ')}`);
    // }



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
      // setKeywordsToPrint(`${slicedKeywordsArray.join(' and ')}`);
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
