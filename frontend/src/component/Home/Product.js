import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const options={
    edit: false,
    color: "grey",
    activeColor:"tomato",
    size: window.innerWidth<600?20:25,
    value:2.5,
    isHalf:true,
}
const Product = ({product}) => {
  return (
   <Link className='productCard'>
    <img src={product.images[0].url}/>
    <p>{product.name}</p>
    <div>
        <ReactStars {...options}/><span>(250 Reviews)</span>
    </div>
    <span>{product.price}</span>
   </Link>
  )
}

export default Product
