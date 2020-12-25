import React from "react";

import Header from "../Header/Header";
import NewsCardsList from "../NewsCardsList/NewsCardsList";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedNews(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [keywordsToPrint, setKeywordsToPrint] = React.useState("");

  let keywordsSet;
  let keywordsArray;
  let slicedKeywordsArray = [];

  let prevValue;
  let objectCounts = {};
  let arrayCounts = [];

  function setKeywords() {
    arrayCounts = [{}];
    props.data.forEach((article) => {
      // console.log("test test test")
      // arrayCounts.push({
      //   keyword: article.keyword,
      //   count: 1,
      // });
      arrayCounts.map((keywordGroup) => {
        console.log("test testing");
        console.log("");
        console.log("keywordgroup", keywordGroup.keyword)
        console.log("articlekeyword", article.keyword)
        if (keywordGroup.keyword === article.keyword) {
          keywordGroup.count++;
        } else {
          arrayCounts.push({
            keyword: article.keyword,
            count: 1,
          });
        }
        console.log("arracy counts", arrayCounts);
      });

      // if (!objectCounts.hasOwnProperty(article.keyword)) {
      //   objectCounts[article.keyword] = 1;
      // } else {
      //   objectCounts[article.keyword]++;
      // }
    });
    // console.log("array counts", arrayCounts)
    // return arrayCounts;
    return objectCounts;
  }

  function displayKeywords() {
    // arrayCounts.sort((a, b) => {
    //   return b.count - a.count;
    // });

    // if (arrayCounts > 2) {
    //   for (let i = 0; i < 2; i++) {
    //     slicedKeywordsArray.push(arrayCounts[i].keyword);
    //   }
    //   // slicedKeywordsArray = arrayCounts.slice(0, 2);
    //   setKeywordsToPrint(
    //     `${slicedKeywordsArray.join(", ")}, and ${
    //       arrayCounts.length - 2
    //     } others`
    //   );
    // } else {
    //   for (let i = 0; i < arrayCounts.length; i++) {
    //     slicedKeywordsArray.push(arrayCounts[i].keyword);
    //   }
    //   console.log(slicedKeywordsArray)
    //   setKeywordsToPrint(`${slicedKeywordsArray.join(" and ")}`);
    // }

    if (Object.keys(objectCounts).length > 2) {
      slicedKeywordsArray = Object.keys(objectCounts).slice(0, 2);
      setKeywordsToPrint(
        `${slicedKeywordsArray.join(", ")}, and ${
          Object.keys(objectCounts).length - 2
        } others`
      );
    } else {
      setKeywordsToPrint(`${Object.keys(objectCounts).join(" and ")}`);
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
      <div className="saved-news">
        <Header
          isPopupOpened={props.isPopupOpened}
          closePopups={props.closePopups}
          onLogout={props.onLogout}
          savedNewsClass="saved-news"
          isLoggedIn={props.isLoggedIn}
          onHomeClick={props.onHomeClick}
        />
        <div className="saved-news__subheader-container">
          <p className="saved-news__subheader saved-news__subheader_text_title">
            Saved articles
          </p>
          <p className="saved-news__subheader saved-news__subheader_text_descriptor">
            {`${currentUser.name}, you have ${props.data.length} articles saved`}
          </p>
          <p className="saved-news__subheader saved-news__subheader_text_keywords">
            By keywords:{" "}
            <span className="saved-news__subheader saved-news__subheader_text_keywords_bold">
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
