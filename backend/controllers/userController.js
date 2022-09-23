const ErrorHander = require("../utlis/errorhandler");
const asyncErrorHandle = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendEmail =require("../utlis/sendEmail");
const crypto=require("crypto");


// Register User
exports.registerUser= catchAsyncError(async (req,res,next,err)=>{

    const{name,email,password}=req.body;

    const user= await User.create({
        name,email,password,
        avatar:{
            public_id:"wswww",
            url:"prof",
        }

       


    });
const token = user.getJWTToken()
    res.status(201).json({
        success: true,
        user,
        token,
    });
})

// Sample for conventional try and catch method
// exports.registerUser = async (req,res,next)=>{
//     try{
//         const{name,email,password}=req.body;

//         const user= await User.create({
//             name,email,password,
//             avatar:{
//                 public_id:"wswww",
//                 url:"prof",
//             }
//         });
    
//         res.status(201).json({
//             success: true,
//             user
//         })
//     }
//     catch(err){
//         console.log(err);
//     }
// }


//Login user

exports.loginUser= catchAsyncError(async (req,res,next)=>{
    const{email,password}= req.body;
const count= await User.count();
console.log(count);
    //checking if user has given password and email

    if(!email || !password){
        return next(new ErrorHander("Please Enter Email and Password",400));
    }
        const user = await User.findOne({email}).select("+password");

        if(!user){
            return next(new ErrorHander("Invalid Email or Password",401));

        }

const isPasswordMatch = await user.comparePass(password);

        if(!isPasswordMatch){
            return next(new ErrorHander("Invalid Email or Password",401));

        }

        const options ={
            expires:new Date(
                Date.now()+process.env.Cookie_Expire * 24 *60 *60*1000
            ),
            httpOnly: true,
        }

        const token = user.getJWTToken()
    res.status(200).cookie("token",token,options).json({
        success: true,
        user,
        token,
    })

    
});

exports.logout= catchAsyncError(async(req,res,next)=>{
res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
})

    res.status(200).json({
        success:true,
        message:"Logged Out",
    })
})


// Foget Password

exports.forgotPassword= catchAsyncError(async (req,res,next)=>{

const user= await User.findOne({email:req.body.email});

if(!user){
    return next(new ErrorHander ("User not found",404));

}

// Get Reset Password token
 const resetToken = user.getResetPasswordTokens();
 
 await user.save({validateBeforSave:false});

// const resetPasswordUrl = `http://localhost/api/v1/password/reset/${resetToken}`;


const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
const message= `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this kindly ignore this`;
console.log(message);

try{

    await sendEmail({
        email:user.email,
        subject:`Ecommerece Password Recovery`,
        message
    })


    res.status(200).json({
        success:true,
        message:`Email send successfully to ${user.email} `
    })
}catch(error){
    user.resetPassword= undefined;
    user.resetPasswordExpire= undefined;
    await user.save({validateBeforSave:false});

    return next(new ErrorHander(error.message,500));



}




}) 

// Reset password from link
exports.resetPassword= catchAsyncError(async (req,res,next)=>{

    const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");


    const user = await User.findOne({
        resetToken,
        resetPasswordExpire:{$gt:Date.now()},

    });
console.log(user.name)
    if(!user){
        return next (new ErrorHander("User not found",400));

    }

    if(req.body.password != req.body.confirmPassword){
        return next (new ErrorHander("Password and Confirm password needs to be same",400));
    }


    user.password= req.body.password;
    console.log(req.body.password)
    user.resetPassword= undefined;
    user.resetPasswordExpire= undefined;
    await user.save();
    const options ={
        expires:new Date(
            Date.now()+process.env.Cookie_Expire * 24 *60 *60*1000
        ),
        httpOnly: true,
    }
    const token = user.getJWTToken()
    res.status(200).cookie("token",token,options).json({
        success: true,
        user,
        token,
    })
})


// Update User profile
exports.updateProfile= catchAsyncError(async (req,res,next)=>{
//     let user = await User.findById(req.params.id);
// console.log(user.name)
// if(!user){
//     return (new ErrorHander("User not found !!!",404));
// }
// console.log(req.body)

const newData={
    name:req.body.name,
    email:req.body.email,
};


const user= await User.findByIdAndUpdate(req.user.id,newData,{
    new: true,
    runValidators: true,
    useFindAndModify: false,
})


res.status(200).json({
    success: true,
   
})
})


// Get user profile

exports.getUserProfile = catchAsyncError(async (req,res,next) =>{


    const user = await User.findById(req.params.id);
    console.log(user.name)

    if(!user){
        return next (new ErrorHander("User Details not found",404));
    }

    res.status(200).json({
        success:true,
        user
    })
    
})


//Update Password

exports.updatePassword= catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatch = await user.comparePass(req.body.oldPassword);

    if(!isPasswordMatch){
        return next (new ErrorHander("Invalid email or Password",401));
    }

if(req.body.newPassword !== req.body.confirmPassword){
    return next (new ErrorHander("Password and Confirm Password must be same",401));


}
    
user.password= req.body.newPassword;
await user.save();

res.status(200).json({
    success:true,
    user
})

})



// Get List of all the users Admin

exports.getAllUsers= catchAsyncError(async (req,res,next)=>{

    const user= await User.find();


    if(!user){
        return next (new ErrorHander("No Data Found!!!",404));
    }


    res.status(200).json({
        success:true,
        user
    })
})

//Get specfic user admin (admin)

exports.adminGetSpecificUser= catchAsyncError(async (req,res,next)=>{
    const user= await User.findById(req.params.id);
    if(!user){

        return next (new ErrorHander("User not found!!!",404));
    }

    res.status(200).json({
        success:true,
        user
    })
})


// Update user role admin

exports.updateUserRole= catchAsyncError(async (req,res,next)=>{
    const newData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id,newData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success: true,
       
    })
})


exports.deleteUser= catchAsyncError(async (req,res,next)=>{

    const user = await User.findByIdAndDelete(req.params.id);
if(!user){
    return next (new ErrorHander("User not found!!!",404));
}
    user.save();
    res.status(200).json({
        success:true
    })
})