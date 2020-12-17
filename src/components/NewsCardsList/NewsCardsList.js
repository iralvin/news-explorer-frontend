import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardsList(props) {
  const [displayedArticleCards, setDisplayedArticleCards] = React.useState([]);
  const [showMoreButtonDisabled, setShowMoreButtonDisabled] = React.useState(
    false
  );

  function showMoreArticles() {
    setDisplayedArticleCards(props.data);
    setShowMoreButtonDisabled(true);
  }
  function displayThreeArticles() {
    setDisplayedArticleCards(props.data.slice(0, 3));
  }

  React.useEffect(() => {
    displayThreeArticles();
    if (props.data.length > 3) {
      setShowMoreButtonDisabled(false);
    }
  }, [props.data]);

  return (
    <div className='news-list section'>
      <div className='news-list__container'>
        <h2 className='news-list__title'>Search results</h2>
        <ul className='news-list__cards_list'>
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
                    return props.savedArticles.some((savedArticle) => {
                      if (article._id === savedArticle._id) {
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
