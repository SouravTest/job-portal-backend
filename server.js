//===server.js====

//imports packages
//const express = require('express');   //--for common js 
import express from "express";          //--for module type
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan"

//import files
import connectDB from "./config/db.js";
import errorMiddleware from "./middlewares/errorMiddlewares.js"

//import routes
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import jobRoute from "./routes/jobRoutes.js";
//security
import helmet from 'helmet';
import xss from "xss-clean"
import mongoSenitize from "express-mongo-sanitize"

//config .env
dotenv.config();

//Mongo db connection
connectDB();


//rest object
const app = express();

// Trust proxy
app.set('trust proxy', 1);


//Middleware
app.use(helmet());  //header
app.use(xss()); //cross site
app.use(mongoSenitize());  //mongo script
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.get('/',(req,res)=>{
	res.send('<h3>Welcome to job</h3>');
})

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/job',jobRoute);

//validation middleware
app.use(errorMiddleware);

//Port
const PORT = process.env.PORT || 8080;

//Listen
app.listen(PORT,()=>{
	console.log(`Node server is running as '${process.env.dev_mode}' mode on port: ${PORT}`.bgBrightGreen.blue);
})