const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose

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


  app.use(express.static( 'client/build' ));




// set up routes
app.use("/tables", require("./routes/tableRoute"));
app.use("/category", require("./routes/categoryRoute"));
app.use("/prodect", require("./routes/prodectRoute"));
app.use("/order", require("./routes/orderRoute"));

