import React from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';
import InputField from '../InputField/InputField';

function SigninPopup(props) {
  const [emailvalidity, setEmailValidity] = React.useState(false);
  const [passwordValidity, setPasswordValidity] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function closePopup(e) {
    props.closePopup();
  }
  function checkEmailInputValidity(inputValidity) {
    setEmailValidity(inputValidity);
  }
  function checkPasswordInputValidity(inputValidity) {
    setPasswordValidity(inputValidity);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function onSubmit() {
    props.onSubmit(email, password);
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
        onChange={onEmailChange}
      />
      <InputField
        minLength='8'
        inputType='password'
        type='password'
        placeholder='Enter password'
        checkInputValidity={checkPasswordInputValidity}
        onChange={onPasswordChange}
      />
      <button
        className={`popup__submit ${
          emailvalidity && passwordValidity ? '' : 'popup__submit_disabled'
        }`}
        disabled={!emailvalidity && passwordValidity}
      >
        Sign In
      </button>
      <p className='popup__flair-text'>
        or{' '}
        <span
          className='popup__flair-text popup__flair-text_button'
          onClick={props.flairTextClick}
        >
          Sign Up
        </span>
      </p>
    </PopupWithForm>
  );
}

export default SigninPopup;
