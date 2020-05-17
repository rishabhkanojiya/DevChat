const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/slack", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });
const keys = require("../config/keys");

mongoose.connect(keys.mongooseURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
