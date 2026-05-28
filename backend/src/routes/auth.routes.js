const express=require("express")
const router=express.Router()
const {register}=require("../controllers/auth.controller")

router.post("/register",register)//register controller call krty

module.exports=router