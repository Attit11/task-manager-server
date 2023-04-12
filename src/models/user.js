const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error("Please enter a valid age!")
            }
        }
    },
    email:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address!")
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.toLowerCase() === 'password'){
                throw new Error("Password cannot contain 'password'")
            }
            if(value.length < 6){
                throw new Error("Password length must be greater than 6")
            }
        }
    }

})

const User = mongoose.model("User", userSchema)
module.exports = User