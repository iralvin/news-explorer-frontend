import React from 'react';

function PopupWithForm(props) {
  function flairTextClick() {}
  function closePopup(e) {
    if (
      e.target.classList.contains('popup') ||
      e.target.classList.contains('popup__close-button')
    ) {
      props.onClose();
      console.log('clicked outside popupwindow');
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <div
      className={`popup section ${props.isOpened ? 'popup__opened' : ''}`}
      onClick={closePopup}
    >
      <div className='popup__dialog-window'>
        <button
          className='popup__close-button button'
          onClick={closePopup}
        ></button>
        <form
          className='popup__form'
          noValidate
          autoComplete='off'
          onSubmit={onSubmit}
        >
          <h2 className='popup__title'>{props.popupTitle}</h2>

          {props.children}

          <button className={`popup__submit ${props.isFormValid ? "" : "popup__submit_disabled"}`} disabled={!props.isFormValid}>
            {props.buttonText}
          </button>
          <p className='popup__flair-text'>
            or{' '}
            <span
              className='popup__flair-text popup__flair-text_button'
              onClick={props.flairTextClick}
            >
              {props.flairText}
            </span>{' '}
          </p>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
