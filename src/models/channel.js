const mongoose = require("mongoose");
const validator = require("validator");

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isStarred: { type: Boolean },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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

channelSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "channelId",
});

const Channel = new mongoose.model("Channel", channelSchema);

module.exports = Channel;
