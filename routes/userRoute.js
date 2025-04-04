const express = require("express");
const passport = require("passport");
const {
  signupPage,
  registerUser,
  loginPage,
  loginRedirect,
  logout,
} = require("../controllers/userController/userController");
const { saveRedirectUrl } = require("../middleware");
const {
  forgotPasswordPage,
  resetPassword,
  updatePassword,
} = require("../controllers/userController/forgotPassword");
const router = express.Router();
router.route("/signup").get(signupPage).post(registerUser);
router
  .route("/login")
  .get(loginPage)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    loginRedirect
  );
router.get("/logout", logout);
router.route("/resetPassword").get(forgotPasswordPage).post(resetPassword);
router.route("/updatePassword").post(updatePassword)
module.exports = router;
