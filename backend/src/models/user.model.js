const mongoose=require("mongoose");
const { _default, string } = require("zod");
const userSchema =new mongoose.Schema(
    {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // duplicate email allow nahi hoga
    },
    password: {
      type: String,//bcrypt
      required: true,
    },
    isVerified:{
      type:Boolean,
      _default:false
    },
    verificationToken:String,
    verificationTokenExpires:Date,
    resetPasswordToken:String,
    resetPasswordTokenExpires:Date,


  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model("User", userSchema);