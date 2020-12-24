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

  let prevValue;
  let objectCounts = {}

  function setKeywords() {
    // keywordsSet = new Set();
    // props.data.forEach((article) => {
    //   if (!keywordsSet.has(article.keyword)) {
    //     keywordsSet.add(
    //       article.keyword.charAt(0).toUpperCase() + article.keyword.substr(1)
    //     );
    //   }
    // });
    // keywordsArray = Array.from(keywordsSet);

    props.data.forEach((article) => {
      if (!objectCounts.hasOwnProperty(article.keyword)) {
        objectCounts[article.keyword] = 1;
      }
      else {
        objectCounts[article.keyword]++;
      }
    })

    return objectCounts;
  }

  function displayKeywords() {
    // if (keywordsArray.length > 2) {
    //   slicedKeywordsArray = keywordsArray.slice(0, 2);

    //   setKeywordsToPrint(
    //     `${slicedKeywordsArray.join(', ')}, and ${keywordsArray.length - 2
    //     } others`
    //   );
    // } else {
    //   setKeywordsToPrint(`${keywordsArray.join(' and ')}`);
    // }

    if (Object.keys(objectCounts).length > 2) {
      slicedKeywordsArray = Object.keys(objectCounts).slice(0, 2);
      setKeywordsToPrint(
        `${slicedKeywordsArray.join(', ')}, and ${Object.keys(objectCounts).length - 2
        } others`
      );

    } else {
      setKeywordsToPrint(`${Object.keys(objectCounts).join(' and ')}`);
    }


  }

  React.useEffect(() => {
    setKeywords();
    displayKeywords();
  }, [props.data]);





  // React.useEffect(() => {
  //   const testAlphaArray = [
  //     'asdf',
  //     'fdsa',
  //     'fdsa',
  //     'asdf',
  //     'sdfa',
  //     'dsaf',
  //     'asdf',
  //     'dsaf',
  //     'sdfa',
  //     'sdfa',
  //     'sdfa',

  //   ];
  //   const sortedAlphaArray = testAlphaArray.sort();

  //   function arrayCount() {
  //     for (let i = 0; i < sortedAlphaArray.length; i++) {
  //       if (!objectCounts.hasOwnProperty(sortedAlphaArray[i])) {
  //         objectCounts[sortedAlphaArray[i]] = 1;
  //       }
  //       else {
  //         objectCounts[sortedAlphaArray[i]]++
  //       }
  //     }
  //     return objectCounts
  //   }
  //   console.log("arrayCount", arrayCount())

  // }, []);

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
