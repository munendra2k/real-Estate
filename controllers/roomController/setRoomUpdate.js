const Room = require("../../models/room");

module.exports.setRoomUpdate = async (req, res, next) => {
  try {
    let { id } = req.params;
    let room = await Room.findByIdAndUpdate(id, { ...req.body.room });
    req.flash("success", "udateed successfully!!");
    res.redirect("/roomlists");
  } catch (err) {
    next(err);
  }
};
