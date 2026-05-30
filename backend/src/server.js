require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// database
const connectDB = require("./config/db.config");

// middlewares
app.use(cors({
    origin: "http://localhost:5175",
    credentials: true
}));


app.use(express.json());

// routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

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