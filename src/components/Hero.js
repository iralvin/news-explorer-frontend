import React from 'react';
import InputField from './InputField';

import Header from './Header';

function Hero(props) {
  // function checkEmailInputValidity(inputValidity) {
  //   setEmailValidity(inputValidity);
  // }
  // function checkPasswordInputValidity(inputValidity) {
  //   setPasswordValidity(inputValidity);
  // }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className='hero'>
      <div className='hero__title-container'>
        <h1 className='hero__title'>What's going on in the world?</h1>
        <p className='hero__subtitle'>
          Find the latest news on any topic and save them in your personal
          account.
        </p>
      </div>
      <div className='hero__search-container'>
        <form action='' className='hero__search-form' onSubmit={onSubmit}>
          {/* <InputField /> */}
          <input type="text" className="hero__search-input"/>
          <button className='hero__search-button'>Search</button>
        </form>
      </div>
    </div>
  );
}

export default Hero;
