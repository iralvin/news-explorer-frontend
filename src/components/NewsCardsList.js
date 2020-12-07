import React from 'react';

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
          <li className='news-results__cards-item'>
            <div className='news-results__card'>
              <div className='news-results__card-image'></div>
              <div className={`news-results__sign-in-flag ${isSignInFlagActive ? "news-results__sign-in-flag_active" : ""}`}>
                Sign in to save articles
              </div>
              <button
                className='news-results__card-save-button'
                onMouseOver={checkLoginState}
                onMouseOut={disableSignInFlag}
              ></button>
              <p className='news-results__card-date news-results__card_text news-results__card_text_date'>
                November 4, 2020
              </p>
              <p className='news-results__card-title news-results__card_text news-results__card_text_title'>
                Everyone needs a special 'sit' spot in nature
              </p>
              <p className='news-results__card-abstract news-results__card_text news-results__card_text_abstract'>
                ever since i read Richard Louv's influential book, "Last Child
                in the Woods," the idea of having a special "sit spot" has stuck
                with me. This advice, which Louv attributes to nature educator
                Jon Young, is for both adults and children to asdfasfj a;lsfja
                lsfjas;dfjasd
              </p>
              <p className='news-results__card-source news-results__card_text news-results__card_text_source'>
                treehugger
              </p>
            </div>
          </li>

          <li className='news-results__cards-item'>
            <div className='news-results__card'>
              <div className='news-results__card-image'></div>
              <button className='news-results__card-save-button'></button>
              <p className='news-results__card-date news-results__card_text news-results__card_text_date'>
                November 4, 2020
              </p>
              <p className='news-results__card-title news-results__card_text news-results__card_text_title'>
                Everyone needs a special 'sit' spot in nature
              </p>
              <p className='news-results__card-abstract news-results__card_text news-results__card_text_abstract'>
                ever since i read Richard Louv's influential book, "Last Child
                in the Woods," the idea of having a special "sit spot" has stuck
                with me. This advice, which Louv attributes to nature educator
                Jon Young, is for both adults and children to asdfasfj a;lsfja
                lsfjas;dfjasd
              </p>
              <p className='news-results__card-source news-results__card_text news-results__card_text_source'>
                treehugger
              </p>
            </div>
          </li>

          <li className='news-results__cards-item'>
            <div className='news-results__card'>
              <div className='news-results__card-image'></div>
              <button className='news-results__card-save-button'></button>
              <p className='news-results__card-date news-results__card_text news-results__card_text_date'>
                November 4, 2020
              </p>
              <p className='news-results__card-title news-results__card_text news-results__card_text_title'>
                Everyone needs a special 'sit' spot in nature
              </p>
              <p className='news-results__card-abstract news-results__card_text news-results__card_text_abstract'>
                ever since i read Richard Louv's influential book, "Last Child
                in the Woods," the idea of having a special "sit spot" has stuck
                with me. This advice, which Louv attributes to nature educator
                Jon Young, is for both adults and children to asdfasfj a;lsfja
                lsfjas;dfjasd
              </p>
              <p className='news-results__card-source news-results__card_text news-results__card_text_source'>
                treehugger
              </p>
            </div>
          </li>

          <li className='news-results__cards-item'>
            <div className='news-results__card'>
              <div className='news-results__card-image'></div>
              <button className='news-results__card-save-button'></button>
              <p className='news-results__card-date news-results__card_text news-results__card_text_date'>
                November 4, 2020
              </p>
              <p className='news-results__card-title news-results__card_text news-results__card_text_title'>
                Everyone needs a special 'sit' spot in nature
              </p>
              <p className='news-results__card-abstract news-results__card_text news-results__card_text_abstract'>
                ever since i read Richard Louv's influential book, "Last Child
                in the Woods," the idea of having a special "sit spot" has stuck
                with me. This advice, which Louv attributes to nature educator
                Jon Young, is for both adults and children to asdfasfj a;lsfja
                lsfjas;dfjasd
              </p>
              <p className='news-results__card-source news-results__card_text news-results__card_text_source'>
                treehugger
              </p>
            </div>
          </li>

          <li className='news-results__cards-item'>
            <div className='news-results__card'>
              <div className='news-results__card-image'></div>
              <button className='news-results__card-save-button'></button>
              <p className='news-results__card-date news-results__card_text news-results__card_text_date'>
                November 4, 2020
              </p>
              <p className='news-results__card-title news-results__card_text news-results__card_text_title'>
                Everyone needs a special 'sit' spot in nature
              </p>
              <p className='news-results__card-abstract news-results__card_text news-results__card_text_abstract'>
                ever since i read Richard Louv's influential book, "Last Child
                in the Woods," the idea of having a special "sit spot" has stuck
                with me. This advice, which Louv attributes to nature educator
                Jon Young, is for both adults and children to asdfasfj a;lsfja
                lsfjas;dfjasd
              </p>
              <p className='news-results__card-source news-results__card_text news-results__card_text_source'>
                treehugger
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NewsCardsList;
