const Room = require("../../models/room");
module.exports.deleteRoom = async (req, res, next) => {
  try {
    let { id } = req.params;
    let room = await Room.findByIdAndDelete(id);
    req.flash(`success`, `${room.title} deleted successfully!!`);
    res.redirect("/roomlists");
  } catch (err) {
    next(err);
  }
};
