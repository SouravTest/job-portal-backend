//controllers/jobController.js
import jobModel from "../models/jobModel.js";
import mongoose from "mongoose"

export const createJobController = async (req,res,next)=>{
    try{
       const {company,position}=req.body;
       if(!company || !position){
           next('Please provide : company,position');
       }
       req.body.createdBy = req.user.userId;
       const job = await jobModel.create(req.body);
       res.status(201).json({job})
    }catch(error){
        next(error);
    }
};


export const getJobController = async (req,res,next) =>{
    const jobs = await jobModel.find({createdBy:req.user.userId});
    res.status(200).json({
        totalJobs:jobs.length,
        jobs
    })
}



export const updateJobController = async (req,res,next) => {
    //const {id:updateid} = req.params;   //--alias
   try{
        const {id} = req.params;
        const {company,position}=req.body;
        if(!company || !position || !id){    
            next('Please provide : company,position , URL : id');
        }
        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next('Invalid job ID');
        }
        //find job
        const job = await jobModel.findOne({_id:id})
        if(!job){
            next(`no job found for id : ${id}`)
        }
         // Check if the user is authorized to update this job
         if (req.user.userId.toString() !== job.createdBy.toString()) {
            return next('You are not authorized to update this job');
        }
        const updateJob = await jobModel.findOneAndUpdate({_id:id},req.body,{
            new:true, 
            runValidators:true
        })

        res.status(200).json({updateJob});
   }catch(error){
    next(error);
   }
}





export const deleteJobController = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const {company,position}=req.body;
        if(!id){    
            next('Please provide : URL : id');
        }
        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next('Invalid job ID');
        }
        //find job
        const job = await jobModel.findOne({_id:id})
        if(!job){
            next(`no job found for id : ${id}`)
        }
         // Check if the user is authorized to update this job
         if (req.user.userId.toString() !== job.createdBy.toString()) {
            return next('You are not authorized to delete this job');
        }
        await job.deleteOne();

        res.status(200).json({ message: 'Job successfully deleted' });
   }catch(error){
    next(error);
   }
}