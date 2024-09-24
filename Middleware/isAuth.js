const createHttpError = require("http-errors");

const IsAuth = (req, res, next) => {
    if (req.session.userId) {
        next()
    } else {
        throw createHttpError(401,"Login/Signin First")
    }
};

module.exports = IsAuth