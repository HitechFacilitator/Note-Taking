const userModel = require ("../Models/user.model")
const createHttpError = require("http-errors");
const bcrypt = require('bcrypt')
// const session = require("express-session");
const {isEmail} = require('validator');
const {verifEmpty} = require("../Middleware/verifHandler")

exports.register = async (req, res, next) =>{
    const {name, email, password} = req.body;

    try {
        verifEmpty(name, "Your Name is required", next)
        verifEmpty(email, "Enter Your Email", next)
        if (!isEmail(email)) {
            res.status(403).json("Enter a Valid Email Address")
            return
        }
        verifEmpty(password, "Don't Forget to enter your password", next)
        if (password.length < 7) {
            res.status(403).json("You password should have atleast 7 characters")
            return
        }
        if(!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)){
            res.status(403).json("A Strong Password most contain atleast an Upper cases letter(A-Z), a Lower cases letter(a-z) and a numerics(0-1)")
            return
        }
        const nameExist = await userModel.findOne({name: name})
        const emailExist = await userModel.findOne({email: email})
        if (nameExist || emailExist) {
            throw createHttpError(409, "The entered User name or email is already been used")
        } else {
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = await userModel.create({
                name: name,
                email: email,
                password: passwordHash
            })

            req.session.userId = newUser._id

            res.status(201).json(newUser)
        }
        
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) =>{
    const {name, password} = req.body;
    try {
        verifEmpty(name, "Enter Your User Name", next)
        verifEmpty(password, "Don't Forget to enter your password", next)
        const userNameExist = await userModel.findOne({name: name}).select("+password + email")
        if (userNameExist) {
            const passwordOk = await bcrypt.compare(password, userNameExist.password)
            if (passwordOk) {
                req.session.userId = userNameExist._id
                res.status(200).json(userNameExist)
            } else {
                throw createHttpError(401, "Invalid Password")
            }
        } else {
            throw createHttpError(404, "User with the entered credentials do not exist")
        }
    } catch (error) {
        next(error)
    }
}

exports.logout = (req, res, next) =>{
    try {
        req.session.destroy()
        res.clearCookie('connect.sid')
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}
