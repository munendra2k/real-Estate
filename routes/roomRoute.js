const express = require("express");
const router = express.Router();
const { uploadRoom } = require("../controllers/roomController/uploadRoom");
const { isLogedIn } = require("../middleware");
const {
  statCategory,
} = require("../controllers/categoryController/stateCategoryController");
const {
  getRoomDetails,
} = require("../controllers/roomController/getRoomDetails");
const { getRoomList } = require("../controllers/roomController/getRoomList");
const {
  getRoomModify,
} = require("../controllers/roomController/getRoomModify");
const {
  setRoomUpdate,
} = require("../controllers/roomController/setRoomUpdate");
const { deleteRoom } = require("../controllers/roomController/deleteRoom");
const {
  uploadRoomPage,
} = require("../controllers/roomController/uploadRoomPage");
// media upload

router
  .route("/uploadRoom")
  .get(isLogedIn, uploadRoomPage)
  .post(isLogedIn, uploadRoom);
router.get("/showmore/:id", getRoomDetails);
router.get("/roomLists", isLogedIn, getRoomList);
router
  .route("/:id")
  .get(isLogedIn, getRoomModify)
  .put(isLogedIn, setRoomUpdate)
  .delete(isLogedIn, deleteRoom);

router.get("/category/:city", statCategory);
module.exports = router;
