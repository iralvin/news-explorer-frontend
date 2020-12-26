import React from 'react';

function NewsCard(props) {
  const [isCardFlagActive, setIsCardFlagActive] = React.useState(false);
  const [dateString, setDateString] = React.useState('');

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

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
    if (!props.isSavedArticle()) {
      props.onSaveArticle(props.article);
    }
  }

  function onDeleteArticle() {
    props.onDeleteSavedArticle(props.article);
  }

  function setCardButton() {
    if (props.isViewingSavedArticles) {
      return (
        <>
          <div className='news-card__keyword-container'>
            <p className='news-card__keyword-text'>{props.article.keyword}</p>
          </div>
          <div
            className={`news-card__flag news-card__flag_type_trash ${
              isCardFlagActive
                ? 'news-card__flag_active'
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
      );
    } else {
      return (
        <>
          <div
            className={`news-card__flag news-card__flag_type_sign-in ${
              isCardFlagActive
                ? 'news-card__flag_active'
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
      );
    }
  }

  React.useEffect(() => {
    function convertDate() {
      const publishedDate = props.article.publishedAt || props.article.date;
      const date = new Date(publishedDate);
      setDateString(
        `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
      );
      console.log('datestring', dateString);
      console.log('publisheddate', publishedDate);
    }
    convertDate();
  }, []);

  return (
    <li className='news-card__item'>
      <div className='news-card'>
        {setCardButton()}
        <a
          className='news-card__article-link'
          href={props.article.url || props.article.link}
          target='_blank'
        >
          <div
            className='news-card__image'
            style={{
              backgroundImage: `url(${
                props.article.urlToImage || props.article.image
              })`
            }}
          ></div>

          <div className='news-card__text-container'>
            <p className='news-card__date news-card__text news-card__text_date'>
              {dateString}
            </p>
            <p className='news-card__title news-card__text news-card__text_title'>
              {props.article.title}
            </p>
            <p className='news-card__abstract news-card__text news-card__text_abstract'>
              {props.article.description || props.article.text}
            </p>
            <p className='news-card__source news-card__text news-card__text_source'>
              {props.article.source.name || props.article.source}
            </p>
          </div>
        </a>
      </div>
    </li>
  );
}

export default NewsCard;
