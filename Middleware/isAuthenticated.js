const userModel = require ("../Models/user.model")
const createHttpError = require("http-errors");

exports.getAurhenticatedUser = async (req, res, next) =>{
    const authenticatedUserId = req.session.userId
    try {
        console.log("Beffore If : ",req.session);
        if (!authenticatedUserId) {
            throw createHttpError(401,"You haven't authenticated yet")
        }
        console.log("After If : ",req.session);
        const user = await userModel.findById(authenticatedUserId).select("+email")
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}