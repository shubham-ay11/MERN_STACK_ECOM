const express= require('express');
const { registerUser, loginUser,deleteUser, logout,forgotPassword,resetPassword, updateProfile,getUserProfile,adminGetSpecificUser, updatePassword, getAllUsers } = require('../controllers/userController');
const { route } = require('./productRoute');
const router = express.Router();
const { isAuthUser, authorizeRoles } = require("../middleware/auth");



router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").post(logout);
router.route("/password/reset/:token").put(resetPassword);
router.route("/user/update").put(isAuthUser,updateProfile);
router.route("/user/me/:id").get(isAuthUser,getUserProfile);
router.route("/password/update").put(isAuthUser,updatePassword);
router.route("/admin/getusers").get(isAuthUser,authorizeRoles("admin"),getAllUsers);
router.route("/admin/user/:id").get(isAuthUser,authorizeRoles("admin"),adminGetSpecificUser);
router.route("/admin/user/delete/:id").delete(isAuthUser,authorizeRoles("admin"),deleteUser);










module.exports=router;
