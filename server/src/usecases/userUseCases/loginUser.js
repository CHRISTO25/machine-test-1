import asyncHandler from 'express-async-handler'
import { findUserByEmail } from '../../repositories/userRepository.js';
import { matchPassword } from '../../services/bcrypt.js';
import { generateUserToken } from '../../middlewares/createToken.js';


export const loginUser = asyncHandler(async (res, email, password) => {
    if (!email || !password) {
        return { data: "Enter all fields " }
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        if (existingUser.status == false) {
            return { data: "your accout has been blocked" }
        } else {
            const isMatch = await matchPassword(password, existingUser.password)
            if (isMatch) {
                const token = generateUserToken(res, existingUser)
                return { data: "Login Sucess", token }
            } else {
                return { data: "Password does not match." };
            }
        }
    } else {
        return { data: "User not found." };
    }
})
