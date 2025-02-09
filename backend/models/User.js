const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCodeExpires: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
