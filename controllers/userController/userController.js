const passport = require("passport");
const User = require("../../models/user");
const signupPage = (req, res) => {
  res.render("./user/signup.ejs");
};
const registerUser = async (req, res, next) => {
  try {
    let { username, name, password } = req.body;
    let newUser = new User({ username, name });
    let registeredUser = await User.register(
      {
        username: newUser.username,
        name: newUser.name,
        active: false,
      },
      password
    );
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err.message);
      }
      req.flash("success", "You have registerd successfull !!");
      res.redirect("/");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/login");
  }
};
const loginPage = (req, res) => {
  res.render("./user/signin.ejs");
};
const loginRedirect = (req, res) => {
  req.flash("success", `welcome back ${req.user.name}!!`);
  let redirectUrl = res.locals.redirectUrl || "/";
  res.redirect(redirectUrl);
};
const logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logout!");
    res.redirect("/");
  });
};
module.exports = {
  signupPage,
  registerUser,
  loginPage,
  loginRedirect,
  logout,
};
