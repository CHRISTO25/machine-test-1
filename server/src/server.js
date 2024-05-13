import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/mongoDB.js';
import { notFound,errorHandler } from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import userRoutes from './interfaces/routes/user/userRoutes.js'
import cors from "cors"
import session from 'express-session'
import { v4 as uuidv4 } from 'uuid';


dotenv.config();
connectDB();


const port = process.env.PORT || 3000;
const app  = express()

app.use(session({
    secret: uuidv4(),
    saveUninitialized: true,
    cookie: {
      maxAge: 600000000,
    },
    resave: false, 
   
  }));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(cors({ origin: "http://localhost:3000", credentials: true }));


app.use('/api/users',userRoutes);
// app.use('/api/admin',);

app.get('/',(req,res)=>{
    res.send("server working ")
})



app.use(notFound);
app.use(errorHandler);
app.listen(port,console.log(`server is running on port ${port}`))