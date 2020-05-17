const express = require("express");
const User = require("../models/user");
const requireLogin = require("../middleware/requireLogin");
const sharp = require("sharp");
const multer = require("multer");

const router = new express.Router();
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jped|png)$/)) {
      return cb(new Error("Please Upload a valid Image file"));
    }

    cb(undefined, true);
  }
});

router.get("/users/me", requireLogin, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/users/me", requireLogin, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.post(
  "/users/me/avatar",
  requireLogin,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", requireLogin, async (req, res) => {
  try {
    req.user.avatar = undefined;

    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
