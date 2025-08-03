import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { protect } from "./middleware/AuthMiddleware.js";
import AuthRoutes from "./routes/Authroutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "https://healthbridge-client.onrender.com",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["set-cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
const port = process.env.PORT || 3000;

// Add error handling for database connection
connectDB().then(() => {
  console.log("Database connected successfully");
}).catch((error) => {
  console.error("Database connection failed:", error);
  process.exit(1);
});

// Add error handling for server startup
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS origins: ${process.env.CLIENT_URL || 'http://localhost:5173'}, https://healthbridge-client.onrender.com`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome To the HealthBridge Server");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    cors: {
      origins: [
        process.env.CLIENT_URL || "http://localhost:5173",
        "https://healthbridge-client.onrender.com",
      ],
    },
  });
});
app.use("/api/admin", AdminRoutes);

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
