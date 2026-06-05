const errorHandler=(err,req,res,next)=>{
    console.log("ERROR:",err)
    res.status(err,statusCode || 500).json({
        success:false,
        message:err.message || "Inernal Server Error"
    })

}
module.exports=errorHandler