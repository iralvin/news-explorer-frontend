import React from 'react';

function NewsCard(props) {

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
    <li className='news-results__cards-item'>
      <div className='news-results__card'>
        <div className='news-results__card-image'></div>
        <div
          className={`news-results__sign-in-flag ${
            isSignInFlagActive ? 'news-results__sign-in-flag_active' : ''
          }`}
        >
          Sign in to save articles
        </div>
        <button
          className='news-results__card-save-button'
          onMouseOver={checkLoginState}
          onMouseOut={disableSignInFlag}
        ></button>
        <p className='news-results__card-date news-results__card_text news-results__card_text_date'>
          {props.article.date}
        </p>
        <p className='news-results__card-title news-results__card_text news-results__card_text_title'>
          {props.article.title}
        </p>
        <p className='news-results__card-abstract news-results__card_text news-results__card_text_abstract'>
          {props.article.abstract}
        </p>
        <p className='news-results__card-source news-results__card_text news-results__card_text_source'>
          {props.article.source}
        </p>
      </div>
    </li>
  );
}

export default NewsCard;
