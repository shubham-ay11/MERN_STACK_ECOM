const { json } = require("body-parser");

const Product = require("../models/productModels");
const ErrorHander = require("../utlis/errorhandler");
const asyncErrorHandle = require("../middleware/catchAsyncError");
const Apifeatures = require("../utlis/apifeatures");

//Create Product -- Admin
exports.createProduct = asyncErrorHandle(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = asyncErrorHandle(async (req, res,next) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  const apifeature = new Apifeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const product = await apifeature.query;

  res.status(200).json({
    success: true,
    product,
    productCount
  });
});

// Update product admin

exports.updateProduct = asyncErrorHandle(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = asyncErrorHandle(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  await product.remove();
  res.status(200).json({
    success: true,
    product,
  });
});

//Get specific (one) product

exports.getSpecificProduct = asyncErrorHandle(async (req, res, next) => {
  console.log("ss")
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Product reviews and ratings

exports.reviewRating = asyncErrorHandle(async (req, res, next) => {
  const { rating, comment, productID } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(req.body.rating),
    comment,
  };
  const product = await Product.findById(productID);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReview = product.reviews.length;
  }

  // Average of Rating

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  product.ratings = avg / product.numberOfReview;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    product,
  });
});

//Get all reviews

exports.getAllReview = asyncErrorHandle(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next (new ErrorHander("No Product Found !!!", 404))();
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});


// Delete Reviews

exports.deleteAnyReview= asyncErrorHandle(async (req,res,next)=>{

  const product = await Product.findById(req.query.id);

  if(!product){
    return next (new ErrorHander("No Product Found !!!",404))
  }
  const review = product.reviews.filter(rev =>rev.id.toString()!== req.query.reviewid.toString());
  let avg=0;

  review.forEach((rev)=>{
    avg=avg+rev.rating;
  });
  
  const rating=avg/review.length;
  const numberOfReview=review.length;

  await Product.findByIdAndUpdate(req.query.id,{
    review,
    rating,
    numberOfReview
  },{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });


  res.status(200).json({
    success:true,
    product:product.reviews
  })
 
});