import React, { Fragment, useEffect } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);

  const options = {
    edit: false,
    color: "grey",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Fragment>
      <div className="productDetails">
        <div className="productDetailsMain">
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
        <div className="productDetailsSubMain">
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span>({`${product.numberOfReview} Reviews`})</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹ ${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>-</button>
                <input value="1" type="number" />
                <button>+</button>
              </div>{" "}
              <button className="addToCart">Add to Cart</button>
            </div>
            <p>
          Status:{" "}
          <b className={product.stock < 1 ? "redColor" : "greenColor"}>
            {product.stock < 1 ? "OutOfStock" : "InStock"}
          </b>
        </p>
          </div>
        
        <div className="detailsBlock-4">
        Description:<p>{product.description}</p>

       </div>
       <button className="submitReview">Submit Review</button>
        </div>
       
      </div>
    </Fragment>
  );
};

export default ProductDetails;
