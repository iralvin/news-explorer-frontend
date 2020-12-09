import React from 'react';

import PopupWithForm from './PopupWithForm';
import InputField from './InputField';

function SigninPopup(props) {
  const [emailvalidity, setEmailValidity] = React.useState(false);
  const [passwordValidity, setPasswordValidity] = React.useState(false);

  function closePopup(e) {
    // if (e.target.classList.contains('popup')) {
    props.closePopup();
    console.log('clicked outside popupwindow');
    // }
  }
  function checkEmailInputValidity(inputValidity) {
    setEmailValidity(inputValidity);
  }
  function checkPasswordInputValidity(inputValidity) {
    setPasswordValidity(inputValidity);
  }

  function onSubmit() {
    // e.preventDefault();
    props.onSubmit();
  }

  return (
    <PopupWithForm
      className='popup__sign-in'
      onSubmit={onSubmit}
      isOpened={props.isOpened}
      onClose={closePopup}
      popupTitle='Sign In'
      buttonText='Sign In'
      flairText='Sign Up'
      flairTextClick={props.flairTextClick}
      isFormValid={emailvalidity && passwordValidity}
    >
      <InputField
        inputType='email'
        type='email'
        placeholder='Enter email'
        checkInputValidity={checkEmailInputValidity}
      />
      <InputField
        minLength='8'
        inputType='password'
        type='password'
        placeholder='Enter password'
        checkInputValidity={checkPasswordInputValidity}
      />
    </PopupWithForm>
  );
}

export default SigninPopup;
