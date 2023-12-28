// npm modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

// imports
const workoutRoutes = require("./routes/workoutRoute");
const userRoutes = require("./routes/userRoute");

// init app
const app = express();

// db connect

main((err) => {
  if (!err) {
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  }
});

async function main(cb) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    cb()
  } catch (error) {
    console.log(error);
    cb(error);
  }
}

// middleware
app.use(express.json());
app.use(cors({origin: "*"}))

// custom middleware 
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workout", workoutRoutes);
app.use("/api/user", userRoutes);
