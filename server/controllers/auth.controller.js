const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const createError = require("../utils/createError");


exports.registerUser = async (req,res,next) =>{
    try{
        const Olduser = await userModel.findOne({email:req.body.email})

        if(Olduser) return next(createError(404, "user already exists !"))

        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(req.body.password, salt)
        const newUSer = new userModel({...req.body, password:hashPassword})

        const user = await newUSer.save();
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
}

exports.loginUser = async (req,res,next) =>{
    try{
        const user = await userModel.findOne({email: req.body.email})
        if(!user) return next(createError(404, "no user found with this email"))

            const password = req.body.password;
            const correctPassword = bcryptjs.compareSync(password, user.password)

            if(correctPassword){
                const token = jwt.sign({userId: user._id},process.env.JWTKEY, {expiresIn:"1d"})

                const {password, ...others} = user._doc;

                res.status(200).json({...others,token})
                
            }else{
                return next(createError(404, "invalid password"))
            }

    }catch(err){
        next(err)
    }
}