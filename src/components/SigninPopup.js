import React from 'react';

import PopupWithForm from './PopupWithForm';
import InputField from './InputField';

function SigninPopup(props) {
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
    <div className='popup__form_sign-in'>
      <PopupWithForm
        isOpened={props.isOpened}
        onClose={closePopup}
        popupTitle='Sign In'
        buttonText='Sign In'
        flairText='Sign Up'
      >
        <InputField type='email' placeholder='Enter email' />
        <InputField type='password' placeholder='Enter password' />
      </PopupWithForm>
    </div>
  );
}

export default SigninPopup;
