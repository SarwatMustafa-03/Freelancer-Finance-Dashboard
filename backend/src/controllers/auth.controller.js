const User=require("../models/user.model")
const bcrypt=require("bcrypt")

//register
const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body

        //check existing user
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({ message:"User already exists" })
        }


        //hash password
        const hashedPassword=await bcrypt.hash(password,10)
        const user=new User({
            name,
            email,
            password:hashedPassword,
        })
        await user.save()
        res.json({message:"user registered",user})
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}

//login
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};
module.exports={ register,login }