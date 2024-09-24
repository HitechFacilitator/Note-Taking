const userModel = require ("../Models/user.model")
const createHttpError = require("http-errors");

exports.getAurhenticatedUser = async (req, res, next) =>{
    try {
        const user = await userModel.findById(req.session.userId).select("+email")
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}