import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { signUp, logIn, Me, logOut } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.get("/me", protect, Me);

export default router;
