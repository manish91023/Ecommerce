
// importin ng the required libraries or utilities
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT|| 5000

import express from "express";
import colors from "colors"
const app=express();
import cors from 'cors'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import path from "path"
import {fileURLToPath} from "url"
import morgan from "morgan";
import connectDb from "./config/db.js";
// database config
connectDb();

//es module fix
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
//middleware

app.use(cors({
  origin: 'https://ecommerce-rqu3.onrender.com',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json())
app.use(express.static(path.join(__dirname,'./client/build')))
//routes
app.use('/api/v1/auth',authRoutes) 
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest code 
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//port
app.listen(PORT,()=>{
    console.log(`server running on mode ${process.env.DEV_MODE} at ${PORT}`.bgCyan.white)
})