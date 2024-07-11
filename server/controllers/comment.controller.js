const commentModel = require("../models/comments.model");
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const createError = require("../utils/createError");

exports.addComment = async(req,res,next) =>{
    try{
        const comment = new commentModel({
            userId: req.user.userId,
            postId: req.params.id,
            ...req.body
        })
        const newComment = await comment.save();
        res.status(200).json(newComment)
    }catch(err){
        next(err)
    }
}


//like a comment
exports.likeComment = async (req,res,next) =>{
    try{
        const comment = await commentModel.findById(req.params.id)

        if(comment.likes.includes(req.user.userId)){
            await comment.updateOne({$pull : {likes: req.user.userId}})

            res.status(200).json({message:"comment disliked "})
        }else{
            comment.updateOne({$push : {likes:req.user.userId}})
        res.status(200).json({message:"comment liked !"})
        }
    }catch(err){
        next(err)
    }
}

//report a comment
exports.reportAComment = async (req,res,next) =>{
    try{
        const comment = await commentModel.findById(req.params.id)
        if(!comment.reports.includes(req.user.userId)){
            await comment.updateOne({$push : {reports: req.user.userId}})
        }else{
            return next(createError(403, "already reported !"))
        }
        res.status(200).json({message:"comment reported successfully !"})
    }catch(err){
        next(err)
    }
}

//get all comments of the post
exports.getAllPostcomments = async (req,res,next) =>{
    try{
        const comments = await commentModel.find({postId: req.params.id})

        res.status(200).json(comments)
    }catch(err){
        next(err)
    }
}

//delete the comment
exports.deleteComment = async (req,res,next) =>{
    try{
        const post = await postModel.findById(req.params.id)
        const comment = await commentModel.findById(req.body.commentId)

        if(comment.userId === req.user.userId || req.user.userId===post.userId){
            await commentModel.findByIdAndDelete(req.params.id)
        }else{
            next(createError(403, "you are not allowed to perform this task"))
        }

        res.status(200).json({message:"comment deleted successfully !"})
    }catch(err){
        next(err)
    }
}
