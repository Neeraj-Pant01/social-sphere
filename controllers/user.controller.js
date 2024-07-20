const userModel = require("../models/user.model");
const createError = require("../utils/createError");
const bcryptjs = require("bcryptjs");



//update user by id
exports.editUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) return next(createError(404, "user not found !"))

            if(req.user.userId !== req.params.id) return next(createError(404,"you can update only your account !"))

        // const iscorrect = bcryptjs.compareSync(req.body.currentpassword, user.password)

        // console.log("iscorrect", iscorrect)

        // if (!iscorrect) return next(createError(404, "password is not valid !"))

        if (req.body.newPassword) {
            const salt = bcryptjs.genSaltSync(10)
            const hash = bcryptjs.hashSync(req.body.newPassword, salt)

            const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
                $set: { ...req.body, password: hash }
            }, {
                new: true
            })
            const {password, ...others} = updatedUser._doc
            res.status(200).json(others)
        } else {
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updatedUser)
        }
    } catch (err) {
        next(err)
    }
}


//follow a user
exports.followUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id)
        const currentuser = await userModel.findById(req.user.userId)

        if (currentuser.followings.includes(req.params.id)) return next(createError(403, "you already follow this user"))

        await currentuser.updateOne({$push : {followings : req.params.id}})

        await user.updateOne({$push : {followers: currentuser._id}})

        res.status(200).json({message:"user has been followed !"})

    } catch (err) {
        next(err)
    }
}


//unfollow a user
exports.unfollowUser = async (req,res,next) =>{
    try{
        const currentUser = await userModel.findById(req.user.userId)
        const user = await userModel.findById(req.params.id)

        if(!currentUser.followings.includes(req.params.id)) return next(createError(403, "you don't follow this user"))

            await currentUser.updateOne({$pull: {followings: req.params.id}})

            await user.updateOne({$pull : user._id})
            
            res.status(200).json({message:"unfollowed"})
    }catch(err){
        next(err)
    }
}


//get a user
exports.getUser = async (req,res,next) =>{
    const q = req.query;
    try{
        const user = q.name ? await userModel.find({
            username : {$regex: q.name, $options : "i"}
        }) : await userModel.findById(req.params.id)

        if(!user) return next(createError(404, "no user found !"))

            res.status(200).json(user)
    }catch(err){
        next(err)
    }
}


//get the users
exports.getUsers = async (req, res, next) =>{
    try{
        const users = await userModel.find();
        res.status(200).json(users)
    }catch(err){
        next(err)
    }
}


//get nearest users 
exports.getnearestUsers = async (req,res,next) =>{
    try{
        const currentUser = await userModel.findById(req.user.userId)

        const users = await userModel.find({city:currentUser.city})

        res.status(200).json(users)

    }catch(err){
        next(err)
    }
}

//get the followers
exports.getFollowers = async (req,res,next) =>{
    try{
        const user = await userModel.findById(req.params.id)
        const folllowers = await userModel.find({
            _id : {$in : user.followers}
        })
        res.status(200).json(folllowers)
    }catch(err){
        next(err)
    }
}

//get the followings
exports.getTheFollowings = async (req,res,next) =>{
    try{
        const user = await userModel.findById(req.params.id)
        const followings = await userModel.find({
            _id : {$in : user.followings}
        })
        res.status(200).json(followings)
    }catch(err){
        next(err)
    }
}



