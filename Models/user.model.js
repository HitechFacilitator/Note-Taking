// const connection = require("../Config/db.config");
const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        select:false
    },
    password:{
        type:String,
        required:true,
        select:false
    },
});

//Export the model
module.exports = mongoose.model('User', userSchema);