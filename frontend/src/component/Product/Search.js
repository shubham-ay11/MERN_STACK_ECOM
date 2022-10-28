import React, { Fragment, useState } from 'react'
import "./search.css";
import {useNavigate} from "react-router-dom"

const Search = () => {
    const navigate = useNavigate();

    const[keyword, setKeyword]=useState("");
    const searchSubmitHandler = (e)=>{
      
        e.preventDefault();
      
        if(keyword.trim()){
            alert(1)

            navigate(`/products/${keyword}`);

        }
        else{
            alert(2)
            navigate("/products")
        }
    }
  return (
   <Fragment>
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
