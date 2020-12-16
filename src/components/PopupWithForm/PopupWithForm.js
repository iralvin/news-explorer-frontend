import React from 'react';

function PopupWithForm(props) {
  function closePopup(e) {
    if (
      e.target.classList.contains('popup') ||
      e.target.classList.contains('popup__close-button')
    ) {
      props.onClose();
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <div
      className={`popup ${props.className} ${
        props.isOpened ? 'popup__opened' : ''
      }`}
      onClick={closePopup}
    >
      <div className={`popup__dialog-window`}>
        <button
          className='popup__close-button button'
          onClick={closePopup}
        ></button>
        <form
          className={`popup__form`}
          noValidate
          autoComplete='off'
          onSubmit={onSubmit}
        >
          <h2 className='popup__title'>{props.popupTitle}</h2>

          {props.children}
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
