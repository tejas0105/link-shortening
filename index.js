const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const urlRouter = require("./router/urlRouter");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

const app = express();

const connectDB = (URI) =>
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

app.use(express.json());
app.use(cors());

app.use("/", urlRouter);
app.use("/api", urlRouter);

const port = 3000;
const start = async () => {
  try {
    await connectDB(DB);
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
