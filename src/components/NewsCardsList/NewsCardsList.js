import React from 'react';

import { articlesIncrement } from '../../constants/constants';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardsList(props) {
  const [displayedArticleCards, setDisplayedArticleCards] = React.useState([]);
  const [showMoreButtonDisabled, setShowMoreButtonDisabled] = React.useState(
    false
  );
  const [pageNum, setPageCount] = React.useState(1);

  function showMoreArticles() {
    const tempPageCount = pageNum;
    setPageCount(tempPageCount + 1);
  }

  function displayThreeArticles() {
    setDisplayedArticleCards(props.data.slice(0, articlesIncrement));
  }

  React.useEffect(() => {
    displayThreeArticles();
    if (props.data.length > 3) {
      setShowMoreButtonDisabled(false);
    }
  }, [props.data]);

  React.useEffect(() => {
    if (articlesIncrement * pageNum > props.data.length) {
      setDisplayedArticleCards(props.data);
      setShowMoreButtonDisabled(true);
    } else {
      setDisplayedArticleCards(
        props.data.slice(0, articlesIncrement * pageNum)
      );
    }
  }, [pageNum]);

  return (
    <div className='news-list section'>
      <div className='news-list__container'>
        <h2 className='news-list__title'>Search results</h2>
        <ul className='news-list__cards-list'>
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
                  if (props.isLoggedIn && props.savedArticles) {
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
            showMoreButtonDisabled ? 'hidden' : ''
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
