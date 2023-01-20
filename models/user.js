require('dotenv').config();
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    date:{
        type:Date,
        required:true,
        default:Date.now
    }
});

// Signing TOKEN with the secret key stored in env file and saving it in token object in tokens array in database

userSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}


module.exports = mongoose.model('user',userSchema)