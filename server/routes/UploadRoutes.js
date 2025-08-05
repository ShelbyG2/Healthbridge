import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import upload from "../middleware/cloudinaryStorage.js";
import { ProfileImageUpload } from "../controllers/UploadsController.js";

const router = express.Router();

router.post(
  "/upload/profile-image",
  protect,
  upload.single("image"),
  ProfileImageUpload
);

export default router;
