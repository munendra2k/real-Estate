const Room = require("../../models/room");
const indexPage = async (req, res, next) => {
  try {
    const rooms = await Room.find().populate("owner");
    res.render("./view/index.ejs", { rooms });
  } catch (err) {
    next(err);
  }
};

module.exports = { indexPage };
