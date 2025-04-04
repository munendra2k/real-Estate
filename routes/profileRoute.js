const express = require("express");
const router = express.Router();
const {
  profilePage,
} = require("../controllers/userController/profileController");
router.get("/profile/:id", profilePage);
module.exports = router;
