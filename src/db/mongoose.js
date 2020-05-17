const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/slack", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
