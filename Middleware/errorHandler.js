const errorHandler = (error, req, res, next) =>{
    console.error("Error encountered", error);
    let errorMessage = "An unknown error was encountered";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).json({ error: errorMessage });
}

module.exports = errorHandler;