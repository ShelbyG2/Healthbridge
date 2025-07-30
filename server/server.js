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
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const port = process.env.PORT;

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome To the HealthBridge Server");
});
app.use("/api/admin", AdminRoutes);

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
