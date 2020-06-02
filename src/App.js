import Navbar from "./components/shared/Navbar";
import Home from "./components/views/Home";
import Aboutme from "./components/views/Aboutme";
import Portfolio from "./components/views/Portfolio";
import Contact from "./components/views/Contact";
import Footer from "./components/shared/Footer";

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <Aboutme />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}
