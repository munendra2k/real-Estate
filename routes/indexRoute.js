const express = require("express");
const router = express.Router();
const { indexPage } = require("../controllers/viewController/indexController");
router.get("/", indexPage);

module.exports = router;
