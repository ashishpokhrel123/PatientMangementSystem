const mongoose = require("mongoose");

// Db Config
const db = require("../config/keys").mongoose.url;
console.log(db);
const connectionDb = async function () {
  try {
    const con = await mongoose
      .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log(`MongoDB Connected`);
      });
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = connectionDb;
