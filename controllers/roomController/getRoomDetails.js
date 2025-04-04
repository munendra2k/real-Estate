const Room = require("../../models/room");

module.exports.getRoomDetails = async (req, res, next) => {
  try {
    let { id } = req.params;
    const room = await Room.findById(id).populate("owner");

    let recRoomsByCategory = await Room.find({
      category: room.category,
    }).populate("owner");
    let recRoomsByOwner = await Room.find({ owner: room.owner }).populate(
      "owner"
    );
    let recRoomsByCity = await Room.find({ city: room.city }).populate("owner");
    let recRoomsByState = await Room.find({ state: room.state }).populate(
      "owner"
    );
    let recRoomsByZipcode = await Room.find({ zipCode: room.zipCode }).populate(
      "owner"
    );
    res.render("./view/showmore.ejs", {
      room,
      recRoomsByCategory,
      recRoomsByOwner,
      recRoomsByCity,
      recRoomsByState,
      recRoomsByZipcode,
    });
  } catch (err) {
    next(err);
  }
};
