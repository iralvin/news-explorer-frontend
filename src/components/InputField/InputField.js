import React from "react";

function InputField(props) {
  const [inputValidity, setInputValidity] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(e) {
    console.log(e.target.value);
    console.log(e.target.validity.valid);
    props.onChange(e);

    if (!e.target.validity.valid) {
      setInputValidity(false);
      setErrorMessage(e.target.validationMessage);
    } else {
      setInputValidity(true);
      setErrorMessage("");
    }
  }

  //   React.useEffect(() => {
  //     if (props.value !== "") {
  //       setInputValidity(true);
  //       setErrorMessage("");
  //     }
  //   }, []);

  React.useEffect(() => {
    props.checkInputValidity(inputValidity);
  }, [inputValidity, errorMessage]);

  return (
    <div className="popup__input-container">
      <label
        className={`popup__input-title popup__input-title_type_${props.inputType}`}
      >
        {props.inputType}
      </label>
      <input
        className={`popup__input popup__input_type_${props.inputType}`}
        autoComplete="false"
        // ref={props.refs}
        // id={props.id}
        type={props.type}
        name={props.inputType}
        placeholder={props.placeholder}
        minLength={props.minLength}
        required
        // value={props.value}
        onChange={handleInputChange}
      />
      <span
        className={`popup__input-error ${props.spanClassName} ${
          inputValidity ? "" : "popup__input-error_visible"
        }`}
        id={props.spanId}
      >
        {errorMessage}
      </span>
    </div>
  );
}

export default InputField;
