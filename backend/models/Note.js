const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the user model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("note", NoteSchema);
