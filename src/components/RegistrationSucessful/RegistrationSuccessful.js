import React from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';

function RegistrationSuccessful(props) {
  return (
    <PopupWithForm
      popupTitle='Registration successfully completed'
      isOpened={props.isOpened}
      onClose={props.closePopup}
    >
      <p
        className='popup__flair-text  popup__flair-text_registration-success popup__flair-text_button'
        onClick={props.flairTextClick}
      >
        Sign In
      </p>
    </PopupWithForm>
  );
}

export default RegistrationSuccessful;
