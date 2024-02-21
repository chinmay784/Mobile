const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    
    password:{
        type:String,
        required:true,
    },
    
    fullName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },

    confrimpassword:{
        
    }
})



const User = mongoose.model("User",userSchema);

module.exports = User;