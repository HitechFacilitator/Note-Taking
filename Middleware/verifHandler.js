const createHttpError = require("http-errors");
const mongoose = require("mongoose");

exports.verifID = (Id, next) =>{
    if (!mongoose.isValidObjectId(Id)) {
        next(createHttpError(400, "Enter a valid Note ID"))
      }
}

exports.verifEmpty = (obj, comment = "", next) => {
    if (!obj || obj===" " || obj==="  ") {
        throw createHttpError(400, comment)
        return
    }
} 