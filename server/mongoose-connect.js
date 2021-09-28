const mongoose = require("mongoose");

const mongooseConnect = () =>
  mongoose.connect(
    "mongodb+srv://tuval:4388@cluster0.6nsfk.mongodb.net/pos?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) throw err;
      console.log("MongoDB connection established");
    }
  );

module.exports = mongooseConnect