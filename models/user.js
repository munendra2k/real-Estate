const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
    },
    active: Boolean,
    termsCondition: {
      type: Boolean,
      default: true,
    },
    rooms: [{ type: Schema.ObjectId, ref: "Room" }],
  },
  { timestamps: true }
);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
