import React from 'react';
import NewsCard from './NewsCard';

function NewsCardsList(props) {
  const [displayedArticleCards, setDisplayedArticleCards] = React.useState([]);
  const [showMoreButtonDisabled, setShowMoreButtonDisabled] = React.useState(
    false
  );

  function showMoreArticles() {
    setDisplayedArticleCards(props.data);
    setShowMoreButtonDisabled(true)
  }
  function displayThreeArticles() {
    setDisplayedArticleCards(props.data.slice(0, 3));
  }

  React.useEffect(() => {
    displayThreeArticles();
    if (props.data.length > 3) {
      setShowMoreButtonDisabled(false);
    }
  }, []);

  return (
    <div className='news-results section'>
      <div className='news-results__container'>
        <h2 className='news-results__title'>Search results</h2>
        <ul className='news-results__cards-list'>
          {displayedArticleCards.map((article, index) => {
            return (
              <NewsCard
                isLoggedIn={props.isLoggedIn}
                article={article}
                key={index}
              />
            );
          })}
        </ul>

        <button
          className={`news-results__show-more-button ${showMoreButtonDisabled ? "hidden" : ""}`}
          onClick={showMoreArticles}
        >
          Show more
        </button>
      </div>
    </div>
  );
}

export default NewsCardsList;
