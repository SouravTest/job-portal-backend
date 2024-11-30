//controllers/userController.js

import userModel from "../models/userModel.js"

export const updateUserController = async (req,res,next) =>{
    try{
        const {name,lastName,email,location} = req.body;
        console.log('req.user.id',req.user.id);
        if(!name|| !lastName || !email || !location){
        return next('Please provide : name,lastName,email,location');
        }

        const user = await userModel.findOne({ _id:req.user.userId});
        if(!user){
           return next('User not found  : '+req.user.userId);
        }
        
        user.name = name;
        user.lastName=lastName
        user.email=email
        user.location=location

        await user.save();
        const token = user.createJWT();
        res.status(200).json({
          user,
          token
        })
    }catch(error){
        next(error);
    }
}