import { compose, applyMiddleware, combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productReducer } from './reducers/productReducer';
import {productDetailsReducer} from "./reducers/productReducer"
const reducer = combineReducers({})

let intialState={};
const middleware=[thunk];

  const store = configureStore({
    reducer:{
        products:productReducer,
        productDetails:productDetailsReducer
    }
  },intialState,composeWithDevTools(applyMiddleware(...middleware)));

  export default store;
