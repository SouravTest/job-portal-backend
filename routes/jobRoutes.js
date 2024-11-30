//routes/jobRoutes.js

import express from "express"
import {createJobController,getJobController,updateJobController,deleteJobController} from "../controllers/jobController.js"
import authMiddleware from '../middlewares/authMiddleware.js';

//router object 
const router = express.Router();


//routes 
router.post('/create-job',authMiddleware,createJobController);
router.get('/get-job',authMiddleware,getJobController);
router.patch('/update-job/:id',authMiddleware,updateJobController);
router.delete('/delete-job/:id',authMiddleware,deleteJobController);

//export 
export default router;
