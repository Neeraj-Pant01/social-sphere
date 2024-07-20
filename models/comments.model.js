const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    likes:{
        type:[String],
    },
    reports:{
        type:[String],
    }
},{
    timestamps: true
})

module.exports = new mongoose.model("comments", commentSchema)