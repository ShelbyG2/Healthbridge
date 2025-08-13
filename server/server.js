import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import AuthRoutes from "./routes/Authroutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import UploadRoutes from "./routes/UploadRoutes.js";
import DoctorRoutes from "./routes/DoctorRoutes.js";
import PatientRoutes from "./routes/PatientRoutes.js";
import TriageRoutes from "./routes/AiTriageRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://10.0.2.2:5173", // android emulator frontend
      "http://192.168.100.2:5173", // laptop frontend
      "http://localhost:5173", // local frontend
      "http://192.168.100.14:5173", // dev host frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);
const port = process.env.PORT;

connectDB();
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome To the HealthBridge Server");
});
app.use("/api/admin", AdminRoutes);

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/upload", UploadRoutes);
app.use("/api", DoctorRoutes);
app.use("/api", PatientRoutes);
app.use("/api", TriageRoutes);
