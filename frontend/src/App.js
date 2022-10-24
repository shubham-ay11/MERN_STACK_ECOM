import React from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/Home/Home.js";
import webfont from "webfontloader";
import Loader from "./component/layout/Loader/loader"

function App() {
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Montserrat", "Roboto"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Home />
      <Footer />
    </Router>
  );
}

export default App;
