import React from "react";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardsList(props) {
  const [displayedArticleCards, setDisplayedArticleCards] = React.useState([]);
  const [showMoreButtonDisabled, setShowMoreButtonDisabled] = React.useState(
    false
  );
  const [pageCount, setPageCount] = React.useState(1);

  const pageSize = 3;

  // function to show an additional 3 articles
  function showMoreArticles() {
    const tempPageCount = pageCount;
    setPageCount(tempPageCount + 1);
  }

  function displayThreeArticles() {
    setDisplayedArticleCards(props.data.slice(0, pageSize));
  }

  React.useEffect(() => {
    displayThreeArticles();
    if (props.data.length > 3) {
      setShowMoreButtonDisabled(false);
    }
  }, [props.data]);

  React.useEffect(() => {
    console.log("current pagesize * pagecount = ", pageSize * pageCount);
    if (pageSize * pageCount > props.data.length) {
      console.log("reached end of search");
      setDisplayedArticleCards(props.data);
      setShowMoreButtonDisabled(true);
    } else {
      setDisplayedArticleCards(props.data.slice(0, pageSize * pageCount));
    }
  }, [pageCount]);

  return (
    <div className="news-list section">
      <div className="news-list__container">
        <h2 className="news-list__title">Search results</h2>
        <ul className="news-list__cards-list">
          {displayedArticleCards.map((article, index) => {
            return (
              <NewsCard
                onDeleteSavedArticle={(article) => {
                  props.onDeleteSavedArticle(article);
                }}
                onSaveArticle={(article) => {
                  props.onSaveArticle(article);
                }}
                isSavedArticle={() => {
                  if (props.isLoggedIn) {
                    return props.savedArticles.find((savedArticle) => {
                      if (article.title === savedArticle.title) {
                        return true;
                      }
                    });
                  }
                  return false;
                }}
                isViewingSavedArticles={props.isViewingSavedArticles}
                isLoggedIn={props.isLoggedIn}
                article={article}
                key={index}
              />
            );
          })}
        </ul>

        <button
          className={`news-list__show-more-button ${
            showMoreButtonDisabled ? "hidden" : ""
          }`}
          onClick={showMoreArticles}
        >
          Show more
        </button>
      </div>
    </div>
  );
}

export default NewsCardsList;
