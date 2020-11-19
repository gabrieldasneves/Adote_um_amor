import React from 'react';
import "./styles/global.css";
import "./styles/pages/landing.css";
import logoImg from "../src/images/logo.png"
import {FiArrowRight} from "react-icons/fi";

function App() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
          <div className="titulo_logo">
            <img src={logoImg} alt=""/>
            <h1>Adote um amor</h1>
          </div>
        
          <main>
            <h1>O amor tem 4 patas</h1>
            <p>Visite os lares de adoção de animais</p>
          </main>

          <div className="location">
            <strong>Fortaleza</strong>
            <span>CE</span>
          </div>

          <a href="" className="enter-app">
            <FiArrowRight size={26} color="rgba(232,232,232,0.6) "/>
          </a>
      </div>   

    </div>
  );
}

export default App;
