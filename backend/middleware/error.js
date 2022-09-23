const { json } = require("express");
const ErrorHander = require("../utlis/errorhandler");




module.exports = (err, req, res, next) => {
  //mongodb casterror
if(err.name==="CastError"){
  console.log(err.name) 
  const message=`Recouser not Found invalid:${err.path}`;
  err= new ErrorHander(message,400);
  
}


// Mongo DB duplicate Error

if(err.code===11000){
  const message=`Duplicate  ${Object.keys(err.keyValue)} Entered`;
  err= new ErrorHander(message,400);
}

// Wrong JWT token

if(err.name==="JsonWebTokenError"){
  const message=`Json web token invalid, try again`;
  err= new ErrorHander(message,400);
}
if(err.name==="TokenExpiredError"){
  const message=`Json web token expired, try again`;
  err= new ErrorHander(message,400);
}

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";
  res.status(err.statusCode).json({
    success: false,
    // error: err.stack,
    error:err.message
  });
};