const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roomSchema = new Schema(
  {
    title: {
      type: String,
      uppercase: true,
      trim: true,
    },
    area: {
      type: String,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
      min: 0,
      default: 0,
    },
    image: {
      type: String,
      // set: (v) => {
      //   v === ""
      //     ? "https://newprojects.99acres.com/projects/omdev_homes/omdev_luxury_homes/images/8mr7bp4_1733902118_537002257_med.jpg"
      //     : v;
      // },
      default:
        "https://static.india.com/wp-content/uploads/2023/08/Greater-Noida-Freepik.jpg",
    },
    city: {
      type: String,
      trim: true,
      lowercase: true,
    },
    state: {
      type: String,
      trim: true,
      lowercase: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
