const express = require("express");
const {
  createOrder,
  getAllOrders,
  getSpecificOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthUser, createOrder);
router.route("/orders").get(isAuthUser, getAllOrders);
router.route("/order/:id").get(isAuthUser, getSpecificOrder);
router.route("/delete_Order/:id").delete(isAuthUser, deleteOrder);

module.exports = router;
