require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
// media upload
const multer = require("multer");
multer.diskStorage({
  destination: (req, file, cb) => {},
});
const upload = multer({ dest: "./public/uploads/uploadrooms" });

//models
const User = require("./models/user");
// Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//  for ejs templates:
app.engine("ejs", ejsMate);
//app middlewares
app.use(express.static(path.join(__dirname, "public"))); //serving public file
app.use(express.urlencoded({ extended: true })); //decode url
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
const sessionOptions = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true,
    maxAge: Date.now() + 1000 * 60 * 60 * 30,
    expires: 1000 * 60 * 60 * 30,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));
app.use(flash());
app.use(cookieParser());
//local module
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const connectDb = require("./db"); //database connection
connectDb();
//flash message
app.use((req, res, next) => {
  res.locals.info = req.flash("info");
  res.locals.success = req.flash("success");
  res.locals.warning = req.flash("warning");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});
const CustomError = require("./customError");
//router
const indexRoute = require("./routes/indexRoute");
const profileRoute = require("./routes/profileRoute");
const userRoute = require("./routes/userRoute");
const roomRoute = require("./routes/roomRoute");
const errorRoute = require("./routes/errorRoute");
app.use("/", indexRoute);
app.use("/", profileRoute);
app.use("/", userRoute);
app.use("/", roomRoute);
app.use("/", errorRoute);

//server live
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
app.all("*", (req, res, next) => {
  next(new CustomError(500, "something went wrong"));
});
app.use((err, req, res, next) => {
  let { status = 500, message = "Page Not Found" } = err;
  console.log(err);
  res.render("./view/error.ejs", { message, status, err });
});

module.exports = app;
