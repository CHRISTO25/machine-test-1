import User from '../../../entities/user/userModel.js'
import asyncHandler from 'express-async-handler'
import { loginUser } from '../../../usecases/userUseCases/loginUser.js';
import { createUser } from '../../../usecases/userUseCases/signupUser.js';
import { logout } from '../../../middlewares/logout.js';

import { SaveToSession } from '../../../usecases/userUseCases/otpStore.js';
import { verifyOtp } from '../../../services/otp.js';
import { verifyTheOtps } from '../../../usecases/userUseCases/verifyOtp.js';



//Login user  - public  - http://localhost:5000/api/users/
export const userLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const signinResponse = await loginUser(res, email, password)
    const { data, token } = signinResponse;
    console.log(token, "");
    if (token) {
      res.json({ data, token })
    } else {
      res.json({ data });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// All userLogout=======================private
export const userLogout = asyncHandler(async (req, res) => {
  try {
    logout(res)
  } catch (error) {
    console.log(error);
    throw new Error('logout cancelled')
  }

})


//saving all things to cookies of Users =============public
export const storeInCookiesWorker = asyncHandler(async (req, res) => {
  try {
    console.log("came here");
    const { name, email, phone, password } = await req.body;
    const otpGiven = await SaveToSession(req, name, email, phone, password)
    console.log(otpGiven);
    res.json(otpGiven)
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something error happened" });
  }
})



//signup user if otp is correct===============public
export const verifyOtpSignup = asyncHandler(async (req, res) => {
  try {
    const { otp } = await req.body
    console.log(otp, "entered otp--------------------------------------");
    const responseOtpSignup = await verifyTheOtps(req, res, otp)
    const { data, token } = responseOtpSignup
    if (token) {
      res.json({ data, token })
    } else {
      res.json({ data });
    }
    res.json(responseOtpSignup)
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something error happened in th verifyOtpSignup controller" });
  }
})

