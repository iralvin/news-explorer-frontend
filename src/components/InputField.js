import React from 'react';

function InputField(props) {
  //   const [inputValidity, setInputValidity] = React.useState(false);
  //   const [errorMessage, setErrorMessage] = React.useState("");

  //   function handleInputChange(e) {
  //     props.onChange(e);

  //     if (!e.target.validity.valid) {
  //       setInputValidity(false);
  //       setErrorMessage(e.target.validationMessage);
  //     } else {
  //       setInputValidity(true);
  //       setErrorMessage("");
  //     }
  //   }

  //   React.useEffect(() => {
  //     if (props.value !== "") {
  //       setInputValidity(true);
  //       setErrorMessage("");
  //     }
  //   }, []);

  //   React.useEffect(() => {
  //     props.checkInputValidity(inputValidity);
  //   }, [inputValidity, errorMessage]);

  return (
    <div className='popup__input-container'>
      <label className={`popup__input-title popup__input-title_${props.type}`}>
        {props.type}
      </label>
      <input
        className={`popup__input popup__input_${props.type}`}
        autoComplete='false'
        // ref={props.refs}
        // className="hero__search-input"
        // className={props.inputClassName}
        // id={props.id}
        type={props.type}
        // name={props.name}
        placeholder={props.placeholder}
        // minLength={props.minLength}
        // maxLength={props.maxLength}
        // required
        // value={props.value}
        // onChange={handleInputChange}
      />
      <span
      // className={`${props.spanClassName} ${
      //   inputValidity ? "" : "popup__input-error_visible"
      // }`}
      // id={props.spanId}
      >
        place holder span error
        {/* {errorMessage} */}
      </span>
    </div>
  );
}

export default InputField;
