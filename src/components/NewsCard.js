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
    // if (props.isLoggedIn) {
      props.onSaveArticle(props.article);
    // } else {
    //   console.log('sign in to save article');
    // }
  }

  function onDeleteArticle(){
    props.onDeleteSavedArticle(props.article)
  }

  return (
    <li className='news-results__card_item'>
      <div className='news-results__card'>
        <div className='news-results__card_image'></div>

        {/* <div
          className={`news-results__sign-in-flag ${
            isSignInFlagActive ? 'news-results__sign-in-flag_active' : ''
          }`}
        >
          Sign in to save articles
        </div> */}

        {props.isViewingSavedArticles ? (
          <>
            <div className='news-results__card_keyword_container'>
              <p className='news-results__card_keyword_text'>
                {props.article.keyword}
              </p>
            </div>
            <div
              className={`news-results__flag news-results__flag_trash ${
                isCardFlagActive
                  ? 'news-results__flag_active news-results__flag_trash_active'
                  : ''
              }`}
            >
              Remove from saved
            </div>
            <button
              className='news-results__card_button news-results__card_button_trash-button'
              onMouseOver={checkLoginState}
              onMouseOut={disableSignInFlag}
              onClick={onDeleteArticle}
            ></button>
          </>
        ) : (
          <>
            <div
              className={`news-results__flag news-results__flag_sign-in ${
                isCardFlagActive
                  ? 'news-results__flag_active news-results__flag_sign-in_active'
                  : ''
              }`}
            >
              Sign in to save articles
            </div>
            <button
              className={`news-results__card_button news-results__card_button_save-button news-results__card_button_save-button_${
                props.isSavedArticle() ? 'saved' : ''
              }`}
              onMouseOver={checkLoginState}
              onMouseOut={disableSignInFlag}
              onClick={onSaveArticle}
            ></button>
          </>
        )}

        <div className='news-results__card_text-container'>
          <p className='news-results__card_date news-results__card_text news-results__card_text_date'>
            {props.article.date}
          </p>
          <p className='news-results__card_title news-results__card_text news-results__card_text_title'>
            {props.article.title}
          </p>
          <p className='news-results__card_abstract news-results__card_text news-results__card_text_abstract'>
            {props.article.abstract}
          </p>
          <p className='news-results__card_source news-results__card_text news-results__card_text_source'>
            {props.article.source}
          </p>
        </div>
      </div>
    </li>
  );
}

export default NewsCard;
