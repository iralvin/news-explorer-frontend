import React from 'react';

function About(props) {
  return (
    <div className='about section'>
      <div className='about__container'>
        <div className='about__image'></div>
        <div className='about__text-container'>
          <p className='about__text about__text_subtitle'>About the author</p>
          <p className='about__text about__text_description'>
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
            <br/>
            <br/>
            You can also talk about your experience with Practicum, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
