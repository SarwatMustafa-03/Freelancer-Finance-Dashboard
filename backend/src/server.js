require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const transactionRoutes = require("./routes/transaction.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

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