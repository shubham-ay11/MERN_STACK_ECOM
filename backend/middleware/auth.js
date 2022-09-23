const ErrorHander = require("../utlis/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt= require("jsonwebtoken");
const User = require("../models/userModel")

exports.isAuthUser =catchAsyncError(async (req,res,next)=>{
const {token}= req.cookies;

if(!token){
    return next(new ErrorHander("Please Login to access this resource",401));
}

const decodeData= jwt.verify(token, process.env.JWT_SECRET);

req.user= await User.findById(decodeData.id);

next();

});
// ...roles is an array
exports.authorizeRoles=(roles)=>{
   
   
    return (req,res,next)=>{
        console.log(req.user.role);
        if(roles != req.user.role){
        return next   ( new ErrorHander(`Role : ${req.user.role} is not allowed to access this resource`,403 ))
        };
        next();
    }
    
}
