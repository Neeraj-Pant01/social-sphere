const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        maxlength : 50,
        unique: true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
    },

    mobile:{
        type:String,
    },

    hobbies:{
        type: [String],
    },

    followers:{
        type:[String]
    },

    followings:{
        type:[String]
    },

    interest:{
        type:String,
    },

    city:{
        type:String
    },

    area:{
        type:String
    },

    country:{
        type:String
    },
    
    profilePic:{
        type:String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)