import React, { Fragment, useEffect } from 'react'
import "./ProductDetails.css";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material';
import {useSelector,useDispatch} from "react-redux";
import { useParams} from 'react-router-dom';

import {getProductDetails} from "../../actions/productAction";

const ProductDetails = () => {
    
    const dispatch=useDispatch();
    const params = useParams();
    const {product,loading,error}=useSelector(state=>state.productDetails);
    useEffect(()=>{
dispatch(getProductDetails(params.id))
    },[dispatch,params.id]);

alert(JSON.stringify(product))
  return (
    <Fragment>
<div>
  {/* <Carousel>
    {
        product.images &&
        product.images.map((item,i) =>(
            <img className='CarouselImage' key={item.url}
             src={item.url}
             alt={`${i} Slide`}
            
            />
        ))
    }
    </Carousel>   */}
</div>
    </Fragment>
  )
}

export default ProductDetails
