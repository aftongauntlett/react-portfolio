import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Contact from "./components/Contact";
import Aboutme from "./components/Aboutme";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
        <Contact />
        <Portfolio />
        <Aboutme />
      </div>
    </div>
  );
}

export default App;
