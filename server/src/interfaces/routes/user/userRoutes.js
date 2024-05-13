import express from 'express';

import {protect} from '../../../middlewares/authMiddleware.js'
import {   storeInCookiesWorker, userLogin, userLogout,  verifyOtpSignup } from '../../controllers/user/userController.js';



const router = express.Router();

// public routes--------------------------------------------
router.post('/signin',userLogin)
router.post('/logout',userLogout)
router.post('/otp',storeInCookiesWorker)
router.post('/otpVerify',verifyOtpSignup)



export default router;