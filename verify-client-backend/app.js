require('dotenv').config()
// console.log(process.env)
const express = require("express");
const app = express();
const { sequelize, dbConnect } = require("./db.js");

// Data Router
const dataRouter = require("./dataRouter");
const userRouter = require("./userRouter");

// Establishing Connection
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const connectdb = async () => {
  await dbConnect();
  await sequelize.sync().catch((e) => {
    console.log("Error syncing with database ...");
  });
};
connectdb().catch((e) => {
    console.log('Unable to Connect to database')
});

// Parser
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data Router @ ./dataRouter.js
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.use("/data", dataRouter);

// User Router @ ./userRouter.js
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.use("/user", userRouter);

// Catch All
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.use("*", (req, res) => {
  res.status(404);
  res.send("Invalid URL");
});

//Server
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.listen("3000", () => {
  console.log("Listening on Port 3000");
});