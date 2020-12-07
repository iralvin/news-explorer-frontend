import React from 'react';
import NewsCard from './NewsCard';
import data from '../constants/data.json';

function NewsCardsList(props) {
  const [isSignInFlagActive, setIsSignInFlagActive] = React.useState(false);

  function checkLoginState() {
    if (!props.isLoggedIn) {
      setIsSignInFlagActive(true);
    }
  }

  function disableSignInFlag() {
    setIsSignInFlagActive(false);
  }

  return (
    <div className='news-results section'>
      <div className='news-results__container'>
        <h2 className='news-results__title'>Search results</h2>
        <ul className='news-results__cards-list'>
          {data.slice(0, 3).map((article, index) => {
            return (
              <NewsCard
                isLoggedIn={props.isLoggedIn}
                article={article}
                key={index}
              />
            );
          })}
        </ul>

        {data.length > 3 && (
          <button className='news-results__show-more-button'>Show more</button>
        )}
      </div>
    </div>
  );
}

export default NewsCardsList;
