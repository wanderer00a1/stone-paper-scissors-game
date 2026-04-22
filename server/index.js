const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const gameRoute = require("./routes/gameRoutes");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use("/api/games", gameRoute);

app.listen(5000, () => console.log("Server running on 5000"));
