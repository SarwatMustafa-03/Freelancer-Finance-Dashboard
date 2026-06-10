const express=require("express")
const router=express.Router()
const {register, login,getProfile,verifyEmail,forgotPassword,resetPassword}=require("../controllers/auth.controller")
const protect = require("../middlewares/auth.middleware");

router.post("/register",register)//register controller call krty
router.post("/login",login)
router.get("/profile",protect,getProfile)
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports=router