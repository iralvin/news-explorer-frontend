import React from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';
import InputField from '../InputField/InputField';

function SignupPopup(props) {
  const [emailvalidity, setEmailValidity] = React.useState(false);
  const [passwordValidity, setPasswordValidity] = React.useState(false);
  const [nameValidity, setNameValidity] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  function closePopup(e) {
    props.closePopup();
  }

  function checkEmailInputValidity(inputValidity) {
    setEmailValidity(inputValidity);
  }
  function checkPasswordInputValidity(inputValidity) {
    setPasswordValidity(inputValidity);
  }
  function checkNameInputValidity(inputValidity) {
    setNameValidity(inputValidity);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onSubmit() {
    props.onSubmit(email, password, name);
  }

  return (
    <PopupWithForm
      className='popup_sign-up'
      onSubmit={onSubmit}
      isOpened={props.isOpened}
      onClose={closePopup}
      popupTitle='Sign Up'
      buttonText='Sign Up'
      flairText='Sign In'
      flairTextClick={props.flairTextClick}
      isFormValid={emailvalidity && passwordValidity && nameValidity}
    >
      <InputField
        inputType='email'
        type='email'
        placeholder='Enter email'
        checkInputValidity={checkEmailInputValidity}
        onChange={onEmailChange}
      />
      <InputField
        inputType='password'
        type='password'
        placeholder='Enter password'
        minLength='8'
        checkInputValidity={checkPasswordInputValidity}
        onChange={onPasswordChange}
      />
      <InputField
        inputType='name'
        type='text'
        placeholder='Enter name'
        minLength='2'
        checkInputValidity={checkNameInputValidity}
        onChange={onNameChange}
      />

      <button
        className={`popup__submit ${
          emailvalidity && passwordValidity && nameValidity
            ? ''
            : 'popup__submit_disabled'
        }`}
        disabled={!emailvalidity || !passwordValidity || !nameValidity}
      >
        Sign Up
      </button>
      <p className='popup__flair-text'>
        or{' '}
        <span
          className='popup__flair-text popup__flair-text_button'
          onClick={props.flairTextClick}
        >
          Sign In
        </span>
      </p>
    </PopupWithForm>
  );
}

export default SignupPopup;
