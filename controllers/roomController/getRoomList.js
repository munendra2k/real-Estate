const Room = require("../../models/room");
const User = require("../../models/user");
module.exports.getRoomList = async (req, res, next) => {
  try {
    let user = new User(req.user);
    let rooms = await Room.find({ owner: user });
    res.render("./room/roomlists.ejs", { rooms });
  } catch (err) {
    next(err);
  }
};
