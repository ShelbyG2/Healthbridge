import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";
import { protect } from "../middleware/AuthMiddleware.js";
import { getAllUsers } from "../controllers/AdminConroller.js";
const router = express.Router();

router.use(protect, isAdmin);

//Admin routes

router.get("/users", getAllUsers);
export default router;
