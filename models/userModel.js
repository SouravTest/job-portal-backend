//models/userModel.js
import mongoose from  "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

//schema
const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,"Name is required"]
	},
	lastName:{
		type:String,
	},
	email:{
		type:String,
		required:[true,"Email is required"],
		unique:true,
		validate:validator.isEmail,
	},
	password:{
		type:String,
		required:[true,"Password is required"],
		minlength:[6,"password length should be greater than 6"]
	},
	location:{
		type:String,
		default:'India'
	},
},
{timestamps:true}
);


//middleware
userSchema.pre('save',async function(){//if not update password
	if(!this.isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function(userPassword){
	const isMatch =  await	bcrypt.compare(userPassword,this.password);
	return isMatch;
}

//jwt
userSchema.methods.createJWT = function (){
	return JWT.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:'1d'})
}

export default mongoose.model('User',userSchema);