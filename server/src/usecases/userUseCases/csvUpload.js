import asyncHandler from 'express-async-handler'
import { findUserById } from '../../repositories/userRepository.js';


export const csvFilesUploads = asyncHandler(async (req,res,image,id) => {
    if (!image || !id) {
        return { data: "enter all fields " }
    }

    const existingUser = await findUserById(id);
    if (existingUser) {
         existingUser.csvFiles.push({image:image.filename})
         await existingUser.save()
         return { data: "added sucessfull." };
    } else {
        return { data: "User not found." };
    }
})
