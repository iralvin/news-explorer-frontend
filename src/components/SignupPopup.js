import React from "react";

import PopupWithForm from "./PopupWithForm";
import InputField from "./InputField";

function SignupPopup(props) {
  const [emailvalidity, setEmailValidity] = React.useState(false);
  const [passwordValidity, setPasswordValidity] = React.useState(false);
  const [nameValidity, setNameValidity] = React.useState(false);
  function closePopup(e) {
    // if (e.target.classList.contains('popup')) {
    props.closePopup();
    console.log("clicked outside popupwindow");
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

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="popup__form_sign-up">
      <PopupWithForm
        isOpened={props.isOpened}
        onClose={closePopup}
        popupTitle="Sign Up"
        buttonText="Sign Up"
        flairText="Sign In"
        flairTextClick={props.flairTextClick}
        isFormValid={emailvalidity && passwordValidity && nameValidity}
      >
        <InputField
          inputType="email"
          type="email"
          placeholder="Enter email"
          checkInputValidity={checkEmailInputValidity}
        />
        <InputField
          inputType="password"
          type="password"
          placeholder="Enter password"
          minLength="8"
          checkInputValidity={checkPasswordInputValidity}
        />
        <InputField
          inputType="name"
          type="text"
          placeholder="Enter name"
          checkInputValidity={checkNameInputValidity}
        />
      </PopupWithForm>
    </div>
  );
}

export default SignupPopup;
