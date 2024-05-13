import asyncHandler from 'express-async-handler'
import { generateOTP, sendOtpMail } from '../../services/otp.js'
import {  findUserByNumber,findUserByEmail } from "../../repositories/userRepository.js";


export const SaveToSession = asyncHandler(async (req, name, email,  phone, password) => {
    try {

        if (!name || !email || !phone || !password) {
            return { data: " All Fields Are Rquired" }
        }
        
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return { data: "Already have an account" }
        } else {
            
           
            const existingNumber = await findUserByNumber(phone)
            if (existingNumber) {
                return { data: "This phone number has already been taken...." }
            }
            const generatedOtp = await generateOTP() //otp generating
            req.session.globalName = name ? name : req.session.globalName;
            req.session.globalEmail = email ? email : req.session.globalEmail;
            req.session.globalPhone = phone ? phone : req.session.globalPhone;
            req.session.globalPassword = password ? password : req.session.globalPassword;
            req.session.otp = generatedOtp;

            await req.session.save();
          const mailResponse = await sendOtpMail(req.session.globalEmail, generatedOtp); //sending mail to the client 
               
            setTimeout(() => {
                req.session.otp = null;
                req.session.save(); // Save session after removing the OTP
            }, 2 * 60 * 1000);
   console.log(mailResponse,"mail response");
   if (mailResponse == "sucess") {
    return "sucess"
   }

        }

    } catch (error) {
        console.error("Error in SaveToSession:", error);
        // Handle the error appropriately
    }
});
