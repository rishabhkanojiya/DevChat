const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./src/config/keys");
const cors = require("cors");

require("./src/db/mongoose");
require("./src/services/passport");

const authRouter = require("./src/routers/auth");
const userRouter = require("./src/routers/user");
const taskRouter = require("./src/routers/task");
const channelRouter = require("./src/routers/channel");
const messageRouter = require("./src/routers/message");

const app = express();

app.use(cors());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(taskRouter);
app.use(channelRouter);
app.use(messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
