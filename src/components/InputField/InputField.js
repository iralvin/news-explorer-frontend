import React from 'react';

function InputField(props) {
  const [inputValidity, setInputValidity] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  function handleInputChange(e) {
    props.onChange(e);

    if (!e.target.validity.valid) {
      setInputValidity(false);
      setErrorMessage(e.target.validationMessage);
    } else {
      setInputValidity(true);
      setErrorMessage('');
    }
  }

  React.useEffect(() => {
    props.checkInputValidity(inputValidity);
  }, [inputValidity, errorMessage]);

  return (
    <div className='popup__input-container'>
      <label className={`popup__input-title`}>{props.inputType}</label>
      <input
        className={`popup__input`}
        autoComplete='false'
        type={props.type}
        name={props.inputType}
        placeholder={props.placeholder}
        minLength={props.minLength}
        required
        onChange={handleInputChange}
        // ref={props.refs}
        // id={props.id}
        // value={props.value}
      />
      <span
        className={`popup__input-error ${
          inputValidity ? '' : 'popup__input-error_visible'
        }`}
        id={props.spanId}
      >
        {errorMessage}
      </span>
    </div>
  );
}

export default InputField;
