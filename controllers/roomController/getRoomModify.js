const Room = require("../../models/room");

module.exports.getRoomModify = async (req, res, next) => {
  try {
    let { id } = req.params;
    let room = await Room.findById(id);
    res.render("./room/editroom.ejs", { room });
  } catch (err) {
    next(err);
  }
};
