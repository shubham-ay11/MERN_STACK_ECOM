import React, { Fragment, useState } from 'react'
import "./search.css";
import {useNavigate} from "react-router-dom";
import MetaData from "../layout/MetaData";


const Search = () => {
    const navigate = useNavigate();

    const[keyword, setKeyword]=useState("");
    const searchSubmitHandler = (e)=>{
      
        e.preventDefault();
      
        if(keyword.trim()){
           

            navigate(`/products/${keyword}`);

        }
        else{
           
            navigate("/products")
        }
    }
  return (
   <Fragment>
<MetaData title="Search --STUDENTCART" />
    <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input
        type="text"
        placeholder='Search a Product ...'
        onChange={(e) =>setKeyword(e.target.value)}
      
        />
<input type="submit" value="search"  />
    </form>
   </Fragment>
  )
}

export default Search
