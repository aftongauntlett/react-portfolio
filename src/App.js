import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/views/Home";
import Navbar from "./components/shared/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
        <Home />
      </div>
    </div>
  );
}

export default App;
