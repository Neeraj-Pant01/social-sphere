const userModel = require("../models/user.model");
const createError = require("../utils/createError");
const bcryptjs = require("bcryptjs");



//update user by id
exports.editUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) return next(createError(404, "user not found !"))

        const iscorrect = bcryptjs.compareSync(req.body.currentpassword, user.password)

        console.log("iscorrect", iscorrect)

        if (!iscorrect) return next(createError(404, "password is not valid !"))

        if (req.body.newPassword) {
            const salt = bcryptjs.genSaltSync(10)
            const hash = bcryptjs.hashSync(req.body.newPassword, salt)

            const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
                $set: { ...req.body, password: hash }
            }, {
                new: true
            })
            res.status(200).json(updatedUser)
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