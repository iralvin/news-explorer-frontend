import React from "react";
import InputField from "./InputField";

import Header from "./Header";

function Hero() {
  return (
    <div className="hero section">
      <Header />
      <div className="hero__title-container">
        <h1 className="hero__title">What's going on in the world?</h1>
        <p className="hero__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
      </div>
      <div className="hero__search-container">
        <InputField />
        <button className="hero__search-button">Search</button>
      </div>
    </div>
  );
}

export default Hero;
