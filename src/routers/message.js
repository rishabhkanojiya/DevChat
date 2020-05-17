const express = require("express");
const Message = require("../models/message");
const Channel = require("../models/channel");
const requireLogin = require("../middleware/requireLogin");

const router = new express.Router();

router.post("/api/messages", requireLogin, async (req, res) => {
  const message = new Message({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
});

// /api/messages?limit=1
// /api/messages?skip=1
// /api/messages?sortBy=completed:true

router.get("/api/messages", requireLogin, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  try {
    await req.user
      .populate({
        path: "messages",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();

    res.send(req.user.messages);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.get("/api/messages/:id", requireLogin, async (req, res) => {
  const _id = req.params.id;

  try {
    const message = await Message.findOne({ _id, owner: req.user._id });
    if (!message) {
      return res.status(404).send();
    }
    res.send(message);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.get("/api/messages/channelId/:id", requireLogin, async (req, res) => {
  const _id = req.params.id;

  try {
    const message = await Message.find({
      channelId: _id,
    });

    if (!message && !members) {
      return res.status(404).send();
    }

    res.send(message);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.patch("/api/messages/:id", requireLogin, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["description", "completed"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid Update" });
  }

  try {
    const message = await Message.findOne({
      _id: req.params.id,
      members: req.user._id,
    });

    if (!message) {
      return res.status(404).send();
    }
    updates.forEach((update) => (message[update] = req.body[update]));
    await message.save();

    res.send(message);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/api/messages/:id", requireLogin, async (req, res) => {
  try {
    const message = await Message.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!message) {
      return res.status(404).send();
    }
    res.send(message);
  } catch (error) {
    res.send(error).status(500);
  }
});

module.exports = router;
