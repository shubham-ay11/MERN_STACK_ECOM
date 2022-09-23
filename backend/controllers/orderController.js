const { json } = require("body-parser");

const Product = require("../models/productModels");
const ErrorHander = require("../utlis/errorhandler");
const asyncErrorHandle = require("../middleware/catchAsyncError");
const Apifeatures = require("../utlis/apifeatures");
const Order = require("../models/orderModel");

//Create Order
exports.createOrder = asyncErrorHandle(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxprice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order= await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxprice,
    shippingPrice,
    totalPrice,
    paideAt:Date.now(),
    user:req.user._id,
  });

  res.status(200).json({
    sucess:true,
    order
  })
});
