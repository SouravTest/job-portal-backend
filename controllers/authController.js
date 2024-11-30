//controllers/authController.js
import userModel from "../models/userModel.js"

export const registerController = async (req,res) =>{
	try{
		const {name,email,password} =  req.body;
		//validate
		if(!name){
			return res.status(400).send({success : false,message:'Please provide name'});
		}
		if(!email){
			return res.status(400).send({success : false,message:'Please provide email'});
		}
		if(!password){
			return res.status(400).send({success : false,message:'Please provide password'});
		}
		//check existing user
		const existingUser = await userModel.findOne({email});
		if(existingUser){
			return res.status(200).send({success : false,message:'Email already exists'});
		}
		
		//create user
		const user = await userModel.create({name,email,password});
		//crete token
		const token = user.createJWT();

		res.status(201).send({
			success : true,
			message : "user created successfully",
			user:user,
			token
		});
		
	}catch(error){
		console.log(error);
		res.status(400).send({
			success : false,
			message : "Error in register controller",
			error:error
		});
	}
}




export const loginController = async (req,res) =>{
	try{
		const {email,password} = req.body;
		if(!email || !password){
			return res.status(400).send({success : false,message:'Please provide email & password'});
		}
		//find user by email
		const user = await userModel.findOne({email});
		if(!user){
			return res.status(400).send({success : false,message:'Invalid user or password'});
		}

		//compair password
		const ismatch = await user.comparePassword(password);
		if(!ismatch){
			return res.status(400).send({success : false,message:'Invalid user or password'});
		}

		//crete token
		const token = user.createJWT();
		//replace password
		// user.password = '==HIDDEN==';

		res.status(201).send({
			success : true,
			message : "user Login successfully",
			user:user,
			token
		});


	}catch(error){
		console.log(error);
		res.status(400).send({
			success : false,
			message : "Error in login controller",
			error:error
		});
	}
}