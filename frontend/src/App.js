import React from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { Redirect,BrowserRouter, Switch, Route,Routes } from 'react-router-dom';
import Home from "./component/Home/Home.js";
import webfont from "webfontloader";
import Loader from "./component/layout/Loader/loader";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";



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
      <Route exact path="/products" element={<Products />} />
      <Route  path="/products/:keyword" element={<Products />} />
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/login" element={<LoginSignUp />} />



     
      
    </Routes>
    <Footer />
  </BrowserRouter>
   
  );
}

export default App;
