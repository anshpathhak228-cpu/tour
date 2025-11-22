const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const { mongoURL } = require("./config");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(mongoURL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api", routes);

app.listen(5000, () => console.log("Server Running on PORT 5000"));
