const Room = require("../../models/room");

module.exports.statCategory = async (req, res, next) => {
  try {
    let { city } = req.params;
    let roomsByState = await Room.find({ city: city });
    res.render("./view/filterResult.ejs", { roomsByState });
  } catch (err) {
    next(err);
  }
};
