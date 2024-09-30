import express from "express"
import {forgotPasswordController, getAllOrdersController, loginController, orderStatusController, registerController, updateProfileController} from "../controllers/authController.js"
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js"
//router object

const router=express.Router()

//routing

//register
router.post('/register',registerController)
//login
router.post('/login',loginController)

//protected user dashboard route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
//protected admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

//forgot password
router.post('/forgot-password',forgotPasswordController)
router.get('/test',requireSignIn,isAdmin,(req,res)=>{
    res.send("ye chal gaya bhi protected hai")
})


//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, isAdmin, getAllOrdersController);


//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
  );

export default router