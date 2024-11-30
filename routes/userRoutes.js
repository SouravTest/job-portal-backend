//routes/userRoutes.js
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { updateUserController } from '../controllers/userController.js';

const router  = express.Router();

router.put('/update-user',authMiddleware,updateUserController)

export default router;