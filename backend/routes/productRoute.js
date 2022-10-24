const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSpecificProduct,
  reviewRating,
  getAllReview,
  deleteAnyReview,
} = require("../controllers/productController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthUser, authorizeRoles("admin"), createProduct);
router.route("/product/:id").put(isAuthUser, authorizeRoles("admin"), updateProduct);
router.route("/product/delete/:id").delete(isAuthUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getSpecificProduct);
router.route("/review").put(isAuthUser, reviewRating);
router.route("/getreviews").get(isAuthUser, getAllReview);
router.route("/deletereview").delete(isAuthUser, deleteAnyReview);

module.exports = router;
