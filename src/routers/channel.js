const express = require("express");
const requireLogin = require("../middleware/requireLogin");
const Channel = require("../models/channel");

const router = new express.Router();

router.post("/api/channels", requireLogin, async (req, res) => {
  const channel = new Channel({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await channel.save();
    res.status(201).send(channel);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/api/channels", requireLogin, async (req, res) => {
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
        path: "channels",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.channels);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.get("/api/channels/:id", requireLogin, async (req, res) => {
  const _id = req.params.id;

  try {
    const channel = await Channel.findOne({ _id, members: req.user._id });
    if (!channel) {
      return res.status(404).send();
    }
    res.send(channel);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.get("/api/channelsMemeber", requireLogin, async (req, res) => {
  try {
    const channel = await Channel.find({ members: req.user._id });
    if (!channel) {
      return res.status(404).send();
    }
    res.send(channel);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.patch("/api/channels/:id", requireLogin, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["name", "description", "members", "isStarred"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid Update" });
  }

  try {
    const channel = await Channel.findOne({
      _id: req.params.id,
      members: req.user._id,
    });

    if (!channel) {
      return res.status(404).send();
    }
    updates.forEach((update) => (channel[update] = req.body[update]));
    await channel.save();

    res.send(channel);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/api/channels/:id", requireLogin, async (req, res) => {
  try {
    const channel = await Channel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!channel) {
      return res.status(404).send();
    }
    res.send(channel);
  } catch (error) {
    res.send(error).status(500);
  }
});

module.exports = router;
