import React from 'react';
import NewsCard from './NewsCard';

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

  React.useEffect(() => {
    console.log('props.isViewingSavedArticles', props.isViewingSavedArticles);
  }, [props.isViewingSavedArticles]);

  return (
    <div className='news-results section'>
      <div className='news-results__container'>
        <h2 className='news-results__title'>Search results</h2>
        <ul className='news-results__cards_list'>
          {displayedArticleCards.map((article, index) => {
            return (
              <NewsCard
                isSavedArticle={() => {
                  console.log(
                    'props.savedArticles.includes(article)',
                    props.savedArticles.includes(article)
                  );
                  console.log(props.savedArticles);
                  console.log(article);
                  if (props.isLoggedIn) {
                    // return false
                    return props.savedArticles.some((savedArticle) => {
                      if (article._id === savedArticle._id) {
                        return true;
                      }
                    });
                    // for (let i = 0; i < props.savedArticles.length; i++) {
                    //   if (props.savedArticles[i]._id === article._id) {
                    //     return true;
                    //   }
                    // }
                    // return props.savedArticles.includes(article);
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
          className={`news-results__show-more-button ${
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
