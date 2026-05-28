const mongoose=require("mongoose")

const connectDB=async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI) 
    } catch (error) {
      console.log("DB Error:", error.message)
        
    }
}

module.exports=connectDB


const mongoose=require("mongoose")

const connectDB=async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI) 
    } catch (error) {
      console.log("DB Error:", error.message)
        
    }
}

module.exports=connectDB