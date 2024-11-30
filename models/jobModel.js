//models/jobModel.js
import mongoose, { mongo } from  "mongoose";
import validator from "validator";

const jobSchema = new mongoose.Schema({
    company :{
        type:String,
        required:[true,"company name is required"]
    },
    position:{
        type:String,
        required:[true,"Job position is required"],
    },
    status:{
        type:String,
        enum:['pending','reject','interview'],
        default:'pending'
    },
    workType:{
        type:String,
        enum:['full-time','part-time','internship','contract'],
        default:'full-time'
    },
    workLocation:{
        type:String,
        default:"kolkat",
        required:[true,"work location is required"]
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export default mongoose.model('Job',jobSchema);