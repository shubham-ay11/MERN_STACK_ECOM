import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({product}) => {
  const options={
    edit: false,
    color: "grey",
    activeColor:"tomato",
    size: window.innerWidth<600?20:25,
    value:product.ratings,
    isHalf:true,
}
  return (
   <Link className='productCard' to={`/product/${product._id}`}>
    <img src={product.images[0].url}/>
    {/* <img src="https://i.ibb.co/DRST11n/1.webp" /> */}
    <p>{product.name}</p>
    <div>
        <ReactStars {...options}/><span>{product.numberOfReview}</span>
    </div>
    <span>{`₹${product.price}`}</span>
   </Link>
  )
}

export default Product
