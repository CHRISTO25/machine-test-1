import { verifyOtp } from "../../services/otp.js";
import { createUser } from "./signupUser.js";


export const verifyTheOtps = async(req,res,otp)=>{
    const systemOtp = req.session.otp
    console.log(systemOtp,'------------------------------------------------------------session otp');
    const otps = otp;
    const otpResponse =await verifyOtp(req,systemOtp,otps)
    console.log(otpResponse,"final otp response");
   if (otpResponse=="true") {
    const signupREsponse = await createUser(req,res)
    const { data, token } = signupREsponse
        if (token) {
         return { data, token }
        } else {
          return { data }
        }
 
   } else {
    return {data:"failed"}
   } 
} 