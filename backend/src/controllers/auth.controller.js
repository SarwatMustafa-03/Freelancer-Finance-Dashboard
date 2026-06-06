const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const {registerSchema,loginSchema,} = require("../validation/auth.validation");
const crypto = require("crypto");


//register
const register = async (req, res) => {
  try {
    //validation
    const result = registerSchema.safeParse(req.body);

    //fail
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0]?.message || "Vaidation Failed",
      });
    }

    //pass
    const { name, email, password } = result.data;

    //check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //if user not exists,then user's password hash through bcrypt
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    //create Useer
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000, //24hours
    });

    //verification link
    const verifyURL = `${process.env.Client_URL}/verify/${verificationToken}`;

    await sendEmail({
      email: user.email,
      subject: "Verify Your Account",
      message: `
        <h2>Welcome ${name}</h2>
        <p>Please verify your email:</p>
        <a href="${verifyURL}">Verify Account</a>
      `,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //check isverified
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email",
      });
    }
    //check password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    //generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//verify email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    console.log("\n🔐 EMAIL VERIFICATION ATTEMPT:");
    console.log("========================================");
    console.log("Token received:", token);
    console.log("Current time:", new Date().toISOString());

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token missing",
      });
    }

    const user = await User.findOne({
      verificationToken: token,
    });

    console.log("User found:", !!user);
    if (user) {
      console.log("User email:", user.email);
      console.log("Token expires at:", user.verificationTokenExpires);
      console.log("Is expired:", user.verificationTokenExpires < Date.now());
      console.log("isVerified:", user.isVerified);
    }
    console.log("========================================\n");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // If already verified, return success (idempotent - safe to call multiple times)
    if (user.isVerified) {
      return res.status(200).json({
        success: true,
        message: "Email already verified",
      });
    }

    // Check if token has expired
    if (user.verificationTokenExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token has expired",
      });
    }

    // activate account
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    console.log("✅ Email verified successfully for:", user.email);
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login,getProfile,verifyEmail };
