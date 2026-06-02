require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// database
const connectDB = require("./config/db.config");

// middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());

// routes
const authRoutes = require("./routes/auth.routes");
const transactionRoutes = require("./routes/transaction.routes");
//auth
app.use("/api/auth", authRoutes);
//transaction
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
    res.send("API running...");
});

const PORT = process.env.PORT || 5000;

//FIX: start server only AFTER DB connects
const startServer = async () => {
    try {
        await connectDB();  

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();

  //  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWM3MGE5MTk5ZTBkYmI3YTkyYWZhNCIsImlhdCI6MTc4MDM5MzM4NiwiZXhwIjoxNzgwNDc5Nzg2fQ.NDI4sVD_lY6pMXPK7_VlseZ2KFztQC81bBRbY1_VKlY",
