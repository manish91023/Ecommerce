import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"

//protected routes 
export const requireSignIn=async (req,res,next)=>{
    try {
        const jwtSecret=process.env.JWT_SECRET
        const decode=JWT.verify(req.headers.authorization,jwtSecret)
        req.user=decode;
        next()
    } catch (error) {
        console.log(error)
    }
}

//admin access ke liye

export const isAdmin= async(req,res,next)=>{

    try {
        
        const users=await userModel.findById(req.user._id)
        if(users.role!==1){
            return res.status(401).send({
                success:false,
                message:"unAuthorized access"
            })
        }else{
            next()
        }
        
    } catch (error) {
        console.log(error)
        
    }
}