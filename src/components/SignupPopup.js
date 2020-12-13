import React from 'react';

import PopupWithForm from './PopupWithForm';
import InputField from './InputField';

function SignupPopup(props) {
  const [emailvalidity, setEmailValidity] = React.useState(false);
  const [passwordValidity, setPasswordValidity] = React.useState(false);
  const [nameValidity, setNameValidity] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

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
    // e.preventDefault();
    props.onSubmit(email, name);
  }

  return (
    <div className='popup__form_sign-up'>
      <PopupWithForm
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
          checkInputValidity={checkNameInputValidity}
          onChange={onNameChange}
        />
      </PopupWithForm>
    </div>
  );
}

export default SignupPopup;
