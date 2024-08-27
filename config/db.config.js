const dotenv = require("dotenv");
const mongoose= require("mongoose");
dotenv.config();

var connection = mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(console.error("Database connection failed"));

module.exports = connection;
