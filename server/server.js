require("dotenv").config();
const express = require("express");
const mongooseConnect = require('./mongoose-connect')
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const tableRoute = require("./routes/tableRoute")

app.use(express.json());
app.use(cors());

mongooseConnect()

app.use(express.static("client/build"));

// TODO implement for other routes
app.use("/tables", tableRoute);
app.use("/category", require("./routes/categoryRoute"));
app.use("/product", require("./routes/productRoute"));
app.use("/order", require("./routes/orderRoute"));

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));