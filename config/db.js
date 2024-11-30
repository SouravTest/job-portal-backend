//config/db.js
import mongoose from 'mongoose';


const connectDB = async () => {
	try{
		const conn = await mongoose.connect(process.env.MONGO_URL);
		console.log(`Mongo DB connect to ${mongoose.connection.host}`);
	}catch(err){
		console.error(`Mongoose connect Error : ${err}`);
	}
}

export default connectDB;