import React from 'react';

function About(props) {
  return (
    <div className='about section'>
      <div className='about__container'>
        <div className='about__image'></div>
        <div className='about__text-container'>
          <p className='about__text about__text_subtitle'>About the author</p>
          <p className='about__text about__text_description'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
            egestas pretium aenean pharetra magna ac placerat vestibulum lectus.
            Metus dictum at tempor commodo ullamcorper a lacus.
            <br />
            <br />
            Amet nisl purus in mollis nunc. Pellentesque nec nam aliquam sem et.
            Id porta nibh venenatis cras sed felis eget velit. Sit amet luctus
            venenatis lectus magna fringilla urna.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
