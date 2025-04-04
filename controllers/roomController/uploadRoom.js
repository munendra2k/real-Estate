const Room = require("../../models/room");
const User = require("../../models/user");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads/uploadrooms"));
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

module.exports.uploadRoom = async (req, res, next) => {
  try {
    upload.single("image");
    let newRoom = new Room(req.body.room);
    // newRoom.user_name = req.user; //whole user details
    newRoom.owner = req.user._id; //only user _id
    let user = new User(req.user);
    user.rooms.push(newRoom);
    await newRoom.save();
    await user.save();
    req.flash("success", "Room uploaded successfully !!");
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
