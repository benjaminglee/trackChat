const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  name: String,
  message: String,
  room: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
