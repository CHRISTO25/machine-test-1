import asyncHandler from 'express-async-handler'
import User from '../entities/user/userModel.js'


// Finding user using email.
export const findUserByEmail = asyncHandler(async (email) => {
    try {

        const userData = await User.findOne({ email });
        return userData
    } catch (error) {
        console.log(error);
        throw error
    }
})



//Finding User with Number
export const findUserByNumber = asyncHandler(async (phone) => {
    try {

        const userData = await User.findOne({ phone });
        return userData
    } catch (error) {
        console.log(error);
        throw error
    }
})





// Saving user.
export const saveUser = asyncHandler(async (name, email, phone, password) => {
    try {

        console.log(name, email, phone, password);
        const users = await User.create({
            name,
            email,
            phone,
            password
        });
        return await users.save();
    } catch (error) {
        console.log(error);
        throw error
    }

})





