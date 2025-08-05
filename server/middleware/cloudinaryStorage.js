import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "HealthBridge/profileImages",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: {
      width: 500,
      height: 500,
      crop: "limit",
      quality: "auto",
      fetch_auto: "auto",
    },
  },
});
const upload = multer({ storage });
export default upload;
