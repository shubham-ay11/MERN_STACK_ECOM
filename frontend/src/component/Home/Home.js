import React from 'react'
import {FiArrowDown} from "react-icons/fi";
import Product from "./Product.js";
import "./Home.css";
const product={
    name:"Black Tshirt",
    price:"₹ 500",
    _id:"58886",
    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}]
}
const Home = () => {
  return (
   
<>
<div className="banner">
<p>Welcome to StudentCart</p>
<h1>Find Amazing Products Below</h1>
<a href="#container">
    <button>
        Scroll <FiArrowDown />
    </button>
</a>

</div>
<h1 className='homeHeading'>Featured Products</h1>
<div className='container' id='container'>
<Product product={product} />
<Product product={product} />
<Product product={product} />
<Product product={product} />
<Product product={product} />
<Product product={product} />
<Product product={product} />
<Product product={product} />
</div>
</>
   
  )
}

export default Home
