import React from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { Redirect,BrowserRouter, Switch, Route,Routes } from 'react-router-dom';
import Home from "./component/Home/Home.js";
import webfont from "webfontloader";
import Loader from "./component/layout/Loader/loader";
import ProductDetails from "./component/Product/ProductDetails.js";

function App() {
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Montserrat", "Roboto"],
      },
    });
  }, []);
  return (
    <BrowserRouter>
    <Header />
    <Routes>

      <Route exact path="/"element={<Home />}/>
      <Route exact path="/product/:id"element={<ProductDetails />}/>

     
      
    </Routes>
    <Footer />
  </BrowserRouter>
   
  );
}

export default App;
