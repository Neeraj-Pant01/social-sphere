const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    pictures:{
        type:[String]
    },
    desc:{
        type:String
    },
    likes:{
        type:[String]
    },
    dislikes:{
        type:[String]
    },
    tags:{
        type:[String]
    },
    location:{
        type:String
    }
},{
    timestamps:true
})


module.exports = mongoose.model('posts',postSchema)