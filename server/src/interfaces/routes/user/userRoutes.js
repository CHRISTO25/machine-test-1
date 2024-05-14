import express from 'express';
import store from '../../../middlewares/multer.js';
import { protect } from '../../../middlewares/authMiddleware.js';


import {   csvFileUpload, storeInCookiesWorker, userLogin, userLogout,  verifyOtpSignup } from '../../controllers/user/userController.js';



const router = express.Router();

// public routes--------------------------------------------
router.post('/signin',userLogin)
router.post('/logout',userLogout)
router.post('/otp',storeInCookiesWorker)
router.post('/otpVerify',verifyOtpSignup)
router.post('/csvUpload',protect, store.single('image'),csvFileUpload)



export default router;