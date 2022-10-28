import React, { Fragment , useEffect} from 'react';
import "./Products.css";
import { useDispatch,useSelector } from 'react-redux';
import { clearErrors,getProduct  } from '../../actions/productAction';
import Loader from "../layout/Loader/loader.js";
import ProductCard from "../Home/Product";
import { useParams } from "react-router-dom";


const Products = () => {
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(
      (state) => state.products
    );
    const params = useParams();

    const keyword= params.keyword;
    useEffect(() => {
      if(error){
     return  alert(error)
      }
      dispatch(getProduct(keyword));
    }, [dispatch, keyword]);
    alert(JSON.stringify(keyword))

  return (
    <Fragment>
{loading ? <Loader />:
<Fragment>
    <h2 className='productsHeading'>Products</h2>
    <div className='productsContainer'>
    {
        products && products.map((product)=>(
            <ProductCard key={product._id} product={product}/>
        ))
    }
        
    </div>
    
</Fragment>

  }
    </Fragment>
  )
}

export default Products
