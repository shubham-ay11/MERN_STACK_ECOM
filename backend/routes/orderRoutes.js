const express = require("express");
const {
    createOrder,
 
} = require("../controllers/orderController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthUser,createOrder);




module.exports = router;
