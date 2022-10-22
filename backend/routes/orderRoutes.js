const express = require("express");
const {
  createOrder,
  getAllOrders,
  getSpecificOrder,
  deleteOrder,
  myOrders,
  updateOrder
} = require("../controllers/orderController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthUser, createOrder);
router.route("/orders").get(isAuthUser, authorizeRoles("admin"), getAllOrders);
router.route("/order/:id").get(isAuthUser, getSpecificOrder);
router.route("/delete_Order/:id").delete(isAuthUser, deleteOrder);
router.route("/orders/me").get(isAuthUser, myOrders);
router.route("/order/update/:id").put(isAuthUser,authorizeRoles("admin"),updateOrder );


module.exports = router;
