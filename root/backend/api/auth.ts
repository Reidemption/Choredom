import express from "express";
const router = express.Router();
//import controllers
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

//routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").post(resetPassword);

module.exports = router;
