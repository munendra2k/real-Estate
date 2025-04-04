const User = require("../../models/user");

module.exports.forgotPasswordPage = (req, res) => {
  res.render("./user/forgotPasswordPage.ejs");
};
module.exports.resetPassword = async (req, res, next) => {
  try {
    let { username } = req.body;
    let user = await User.findOne({ username: username });
    res.render("./user/setPasswordPage.ejs", { user });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePassword = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username: username });
    user.password = user.setPassword(password);
    req.flash("success", "your password have been changed!!");
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
