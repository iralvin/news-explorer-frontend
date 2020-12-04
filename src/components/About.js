import React from "react";
import aboutImg from "../images/georgia-bg.png"

function About(props) {
  return (
    <div className="about section">
      <div className="about-container">
        <div className="about__image"></div>
        <div className="about__text-container">
          <p className="about__subtitle">About the author</p>
          <p className="about__description">This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.

You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
