import React from 'react';

function NewsCard(props) {
  const [isCardFlagActive, setIsCardFlagActive] = React.useState(false);

  function checkLoginState() {
    if (!props.isLoggedIn) {
      setIsCardFlagActive(true);
    } else if (props.isLoggedIn && props.isViewingSavedArticles) {
      setIsCardFlagActive(true);
    }
  }

  function disableSignInFlag() {
    setIsCardFlagActive(false);
  }

  function onSaveArticle() {
    if (props.isLoggedIn) {
      props.onSaveArticle(props.article);
    }
  }

  function onDeleteArticle() {
    props.onDeleteSavedArticle(props.article);
  }

  return (
    <li className='news-card__item'>
      <div className='news-card'>
        <div className='news-card__image'></div>

        {/* <div
          className={`news-card__sign-in-flag ${
            isSignInFlagActive ? 'news-card__sign-in-flag_active' : ''
          }`}
        >
          Sign in to save articles
        </div> */}

        {props.isViewingSavedArticles ? (
          <>
            <div className='news-card__keyword_container'>
              <p className='news-card__keyword_text'>{props.article.keyword}</p>
            </div>
            <div
              className={`news-card__flag news-card__flag_trash ${
                isCardFlagActive
                  ? 'news-card__flag_active news-card__flag_trash_active'
                  : ''
              }`}
            >
              Remove from saved
            </div>
            <button
              className='news-card__button news-card__button_trash-button'
              onMouseOver={checkLoginState}
              onMouseOut={disableSignInFlag}
              onClick={onDeleteArticle}
            ></button>
          </>
        ) : (
          <>
            <div
              className={`news-card__flag news-card__flag_sign-in ${
                isCardFlagActive
                  ? 'news-card__flag_active news-card__flag_sign-in_active'
                  : ''
              }`}
            >
              Sign in to save articles
            </div>
            <button
              className={`news-card__button news-card__button_save-button news-card__button_save-button_${
                props.isSavedArticle() ? 'saved' : ''
              }`}
              onMouseOver={checkLoginState}
              onMouseOut={disableSignInFlag}
              onClick={onSaveArticle}
            ></button>
          </>
        )}

        <div className='news-card__text-container'>
          <p className='news-card__date news-card__text news-card__text_date'>
            {props.article.date}
          </p>
          <p className='news-card__title news-card__text news-card__text_title'>
            {props.article.title}
          </p>
          <p className='news-card__abstract news-card__text news-card__text_abstract'>
            {props.article.abstract}
          </p>
          <p className='news-card__source news-card__text news-card__text_source'>
            {props.article.source}
          </p>
        </div>
      </div>
    </li>
  );
}

export default NewsCard;
