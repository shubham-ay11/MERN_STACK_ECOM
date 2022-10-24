import React, { useEffect } from "react";
import { FiArrowDown } from "react-icons/fi";
import Product from "./Product.js";
import "./Home.css";
import { Helmet } from "react-helmet";
import { getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/loader.js";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
   {loading ? <Loader />:
    <>
    <Helmet title="StudentCart" />
    <div className="banner">
      <p>Welcome to StudentCart</p>
      <h1>Find Amazing Products Below</h1>
      <a href="#container">
        <button>
          Scroll <FiArrowDown />
        </button>
      </a>
    </div>
    <h1 className="homeHeading">Featured Products</h1>
    <div className="container" id="container">
      {products && products.map((product) => <Product product={product} />)}
    </div>
  </>
   }
   </>
  );
};

export default Home;
