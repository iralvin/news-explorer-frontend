import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import Header from './Header';
import Hero from './Hero';
import About from './About';
import Footer from './Footer';
import SigninPopup from './SigninPopup';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isPopupOpened, setIsPopupOpened] = React.useState(false);

  function openPopup() {
    setIsPopupOpened(true);
  }

  function closePopup(e) {
    setIsPopupOpened(false);
  }

  return (
    <div className='App'>
      {/* <Header /> */}
      <SigninPopup isOpened={isPopupOpened} closePopup={closePopup} />

      <Hero onSignInClick={openPopup} />
      <About />
      <Footer />

      {/*       
      <Header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </Header> */}
    </div>
  );
}

export default App;
