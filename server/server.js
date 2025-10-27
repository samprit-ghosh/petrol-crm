import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import outletRoutes from "./routes/outletRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/outlets", outletRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => res.send("Fuel Sales Tracker API running"));

// Add a health check endpoint (important for Render)
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen(PORT, HOST, () => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`🚀 Production server running on port ${PORT}`);
  } else {
    console.log(`🔧 Development server running on http://localhost:${PORT}`);
  }
});