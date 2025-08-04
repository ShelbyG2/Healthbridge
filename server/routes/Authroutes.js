import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { signUp, logIn, Me } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/me", protect, Me);

export default router;
