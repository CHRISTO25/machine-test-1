import asyncHandler from 'express-async-handler'

 export const logout = asyncHandler(async ( res) => {
    
    res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
    })
  return res.json({message:"loged out  sucessfull"})
})