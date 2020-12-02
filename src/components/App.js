import logo from "../logo.svg";
import "../App.css";

import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <PopupWithForm />

      <Hero />
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
