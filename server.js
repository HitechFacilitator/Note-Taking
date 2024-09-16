// importing dependencies
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const createHttpError = require("http-errors")
const cors = require('cors');

// importing files
const router = require("./Routers/mainRouter")
const errorHandler = require("./Middleware/errorHandler");


// setting up the dependencies for use
const app = express();
dotenv.config();

// setting up cors options (which origin can access this backend services)
const corsOption = {
  origin: "http://localhost:3000"
}
app.use(cors(corsOption))

// accepting json data 
app.use(express.json())

const port = process.env.PORT;
//  using the logging 
app.use(morgan("dev"))

app.use("/", router)
app.use((req, res, next) =>{
  next(createHttpError.NotFound("The entered URL does not exist"));
})
app.use(errorHandler)

// setting port and listenning for http request
app.listen(port, () => {
  console.log("App running on http://localhost:" + port);
});
