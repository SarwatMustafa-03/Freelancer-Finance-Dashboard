const mongoose=require("mongoose")
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
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model("User", userSchema);