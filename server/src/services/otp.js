import nodemailer from 'nodemailer'

export const generateOTP = async () => {
    let otp = "";
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}


export const sendOtpMail = async (email, otp) => {
    try {
        // Create a Nodemailer transport object
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });
        // Define email options
        const mailOptions = {
            from: 'christovarghese555@gmail.com',
            to: email,
            subject: 'Your OTP for user verification',
            text: `☆★☆★→SC Kingdom←☆★☆★.Your OTP is ${otp}.Please don't share this with anybody. Validity: 2 minutes.`
        };
        // Send the email
        const result = await transporter.sendMail(mailOptions);
        return "sucess"
        console.log(result);
    } catch (error) {

        console.log(error.message);
    }
}


//cheacking the otp given by the user is right or not
export const verifyOtp = async (req,otp, writtenOtp) => {
    if (otp == writtenOtp) {    
        return "true"
    } else {
        return "false"
    }
}