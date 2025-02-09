const mongoose = require("mongoose");
const dbUri = "mongodb://0.0.0.0:27017/cloudybook";

const connectToDB = async () => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to Database Established Successfully");
  } catch (error) {
    console.log(`Connection to Database Failed with Error ${error.message}`);
  }
};

module.exports = connectToDB;
