const {isHttpError} = require("http-errors")

const errorHandler = (error, req, res, next) =>{
    console.error("Error encountered", error);
    let errorMessage = "An unknown error was encountered";
    let statusCode = 500
    if (isHttpError(error)) {
      errorMessage = error.message;
      statusCode = error.status
    }
    return res.status(statusCode).json({ error: errorMessage});
}

module.exports = errorHandler;