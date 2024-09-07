// importing dependencies
const express = require("express");
const dotenv = require("dotenv");

// importing files
const router = require("./Routers/mainRouter")
const errorHandler = require("./Middleware/errorHandler")


// setting up the dependencies for use
const app = express();
dotenv.config();

const port = process.env.PORT;

app.use("/", router)
app.use((req, res, next) =>{
  next(Error("URL Does not Exist"));
})
app.use(errorHandler)

// setting port and listenning for http request
app.listen(port, () => {
  console.log("App running on http://localhost:" + port);
});
