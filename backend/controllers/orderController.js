const { json } = require("body-parser");

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

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxprice,
    shippingPrice,
    totalPrice,
    paideAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    sucess: true,
    order,
  });
});

// Get All Order Details
exports.getAllOrders = asyncErrorHandle(async (req, res, next) => {
  const order = await Order.find();
  if (!order) {
    return next(new ErrorHander("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get Specific Order
exports.getSpecificOrder = asyncErrorHandle(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHander("Order not Found with this is", 404));
  }

  res.status(200).json({
    sucess: true,
    order,
  });
});

// Delete Order
exports.deleteOrder = asyncErrorHandle(async (req, res, next) => {
  console.log("order");

  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHander("Order Not found", 404));
  }

  await order.remove();
  res.status(200).json({
    success: true,
  });
});
