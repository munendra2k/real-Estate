const mongoose = require("mongoose");
const MONGODBURL = "mongodb://127.0.0.1:27017/roomForRent";

const connectDb = async () => {
  await mongoose.connect(MONGODBURL);
};
connectDb()
  .then((res) => {
    console.log("database connect successful");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = connectDb;
