const postModel = require("../models/post.model");
const createError = require("../utils/createError");


exports.addPost = async (req, res, next) => {
    try {
        const post = new postModel({ ...req.body, userId: req.user.userId })
        const newPost = await post.save();
        res.status(200).json(newPost)
    } catch (err) {
        next(err)
    }
}


//like the post
exports.likePost = async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id)
        if (post.likes.includes(req.user.userId)) return next(createError(403, "you already liked this post"))
        await post.updateOne({ $push: { likes: req.user.userId } })

        post.dislikes(includes(req.user.userId)) && await post.updateOne({ $pull: { dislikes: req.user.userId} })

        res.status(200).json({ message: "post liked" })
    } catch (err) {
        next(err)
    }
}


//dislike the post 
exports.dislikePost = async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id);
        if (!post.likes.includes(req.user.userId)) return next(createError(404, "you haven't liked this post yet !"))

        await post.updateOne({ $pull: { likes: req.user.userId } })
        await post.updateOne({ $push: { dislikes: req.user.userId } })

        res.status(200).json({ message: "post disliked !" })
    } catch (err) {
        next(err)
    }
}


//update the post
exports.updatePost = async (req, res, next) =>{
    try{
        const post = await postModel.findById(req.params.id)
        if(post.userId === req.user.userId){
            const updatedPost = await postModel.findByIdAndUpdate(req.params.id, {
                $set : req.body
            },{
                new: true
            })
            res.status(200).json(updatedPost)
        }else{
            return next(createError(403, "you can update only your post !"))
        }
    }catch(err){
        next(err)
    }
}


//delete post 
exports.deletePost = async (req, res,next) =>{
    try{
        const post = await postModel.findById(req.params.id)
        if(post.userId === req.user.userId){
            await postModel.findByIdAndDelete(req.params.id)
            res.status(200).json({message:"post deleted successfully !"})
        }else{
            return next(createError(403, "you can delete only your post !"))
        }
    }catch(err){
        next(err)
    }
}


//get a single post 
exports.getSinglePost = async (req, res, next) =>{
    try{
        const post = await postModel.findById(req.params.id);
        res.status(200).json(post)
    }catch(err){
        next(err)
    }
}


//get all the post
exports.getAllPosts = async (req,res,next) =>{
    try{
        const posts = await postModel.find();
        res.status(200).json(posts)
    }catch(err){
        next(err)
    }
}


//get the user's profile post
exports.getProfilePosts = async (req,res,next) =>{
    try{
        const posts = await postModel.find({userId: req.user.userId})
        res.status(200).json(posts)
    }catch(err){
        next(err)
    }
}