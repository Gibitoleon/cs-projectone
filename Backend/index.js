require("express-async-errors"); // for handling async errors and throwing them to the error handler
require("dotenv").config(); //load environment variables from .env file
//requiring  files
const express = require("express"); //for creating server
const cookieparser = require("cookie-parser"); //for parsing cookies
const { app, server } = require("./ServerConfig/server.config"); //requiring our configured server
const authroutes = require("./Routes/auth.routes"); //importing auth routes

//requiring custom error handler middleware
const ErrorHandler = require("./Middleware/ErrorHandler"); //importing the error handler middleware

//requiring Database connection
const ConnectDb = require("./Dbconnection/Connect"); //importing the database connection file

//requiring the jobs middleware
const Jobs = require("./Services/Jobs/Jobs"); //importing the jobs middleware
//middleware
app.use(express.json()); //parse incoming JSON requests
app.use(cookieparser()); //parse cookies from incoming requests

//routes
app.use("/api/v1/auth", authroutes); //using auth routes

//error handler middleware
app.use(ErrorHandler.HandleError); //using the error handler middleware

const port = process.env.PORT || 7000; //loading port from environmnet variables

const StartServer = async () => {
  try {
    await ConnectDb.connect(process.env.MONGO_URI); //connecting to the database
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`); //logging the server start message
      Jobs.clearUnverifiedUsers();
    });
  } catch (error) {
    console.log(error.message); //logging the error message
  }
};
StartServer(); //calling the function to start the server
