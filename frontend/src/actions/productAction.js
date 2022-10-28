import {ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS} from "../constants/productConstants"
import axios from "axios";
const url=`http://localhost:4000/api/v1`;

export const getProduct = (keyword="")=>async (dispatch)=>{
    try{

dispatch({
    type:ALL_PRODUCT_REQUEST
});
let link=`/products?keyword=${keyword}`;
const {data}=await axios.get(url+link);
dispatch({
    type:ALL_PRODUCT_SUCCESS,
    payload:data,

});

    }catch(error){

        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload: error.response.data.error
        })

       // console.log(error.response.data.error)

    }
}

// Get Product Details
export const getProductDetails =  (id)=>async (dispatch)=>{
try{
    dispatch({
        type: PRODUCT_DETAILS_REQUEST
    });
    const {data}=await axios.get(url+`/product/${id}`);
dispatch({
    type:PRODUCT_DETAILS_SUCCESS,
    payload:data,

});
}
catch(error){
    dispatch({
        type:PRODUCT_DETAILS_FAIL,
        payload: error.response.data.error
    });
}
}
export const clearErrors = ()=>async (dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}
