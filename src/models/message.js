const mongoose = require("mongoose");

const messageSchmea = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    memName: {
      type: String,
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Message = new mongoose.model("Message", messageSchmea);

module.exports = Message;
