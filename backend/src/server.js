require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();

const connectDB = require("./config/db.config");
connectDB();

app.use(cors( {
    origin: "http://localhost:3000", // frontend URL (React)
    credentials: true
 }));
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);//req ko route tak bhejty

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});