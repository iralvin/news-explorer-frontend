import React from 'react';

function PopupWithForm(props) {
  function closePopup(e) {
    if (e.target.classList.contains('popup')) {
      props.closePopup();
      console.log('clicked outside popupwindow');
    }
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div
      className={`popup section ${props.isOpened ? 'popup__opened' : ''}`}
      onClick={props.onClose}
    >
      <div className='popup__dialog-window'>
        <form className='popup__form' noValidate autoComplete='off'>
          <h2 className='popup__title'>{props.popupTitle}</h2>
          {props.children}
          {/* <div className='popup__input-container'>
            <label className='popup__input-title popup__input-title_email'>
              Email
            </label>
            <input
              className='popup__input'
              placeholder='Enter email'
              type='email'
            />
            <span className='popup__span-error'>span placeholder</span>
          </div>

          <div className='popup__input-container'>
            <label className='popup__input-title popup__input-title_password'>
              Password
            </label> 
            <input
              className='popup__input'
              placeholder='Enter password'
              type='password'
            />{' '}
            <span className='popup__span-error'>span placeholder</span>
          </div>

          <div className='popup__input-container'>
            <label className='popup__input-title popup__input-title_name'>
              Name
            </label>
            <input
              className='popup__input'
              placeholder='Enter name'
              type='text'
            />{' '}
            <span className='popup__span-error'>span placeholder</span>
          </div> */}

          <button className='popup__submit'>{props.buttonText}</button>
          <p className='popup__flair-text'>
            or{' '}
            <span className='popup__flair-text popup__flair-text_button'>{props.flairText}</span>{' '}
          </p>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
