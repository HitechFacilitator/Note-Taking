const express = require("express");
const nRouter = express.Router()

const user = require("../Controllers/user.controller")
const { getAurhenticatedUser } = require("../Middleware/getAuthenticatedUser");
const IsAuth = require("../Middleware/isAuth");

// nRouter.get('/',user.getAurhenticatedUser)
nRouter.get('/'/*, IsAuth*/, getAurhenticatedUser, (req, res) =>{
    res.status(200).json("Welcome to the USER Section")
})

nRouter.post("/signUp",user.register)
nRouter.post("/signIn",user.login)
nRouter.post("/logOut",user.logout)

module.exports = nRouter 