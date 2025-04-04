const Room = require("../../models/room");
const profilePage = async (req, res, next) => {
  try {
    let { id } = req.params;
    const roomsOwner = await Room.find({ owner: id }).populate("owner");
    // console.log("roomsOwner", roomsOwner);
    res.render("./view/profile.ejs", { roomsOwner });
  } catch (err) {
    next(err);
  }
};

module.exports = { profilePage };
