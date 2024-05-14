import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    
      csvFiles:[
        {
           image:{
            type:String
           } 
        }
      ]
    ,
    status: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User;
