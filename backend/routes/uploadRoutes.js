import express from "express";
import multer from "multer";
import { uploadBufferToCloudinary } from "../utils/cloudinary.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
// Use memory storage so we have access to req.file.buffer for Cloudinary streaming
const upload = multer();

router.post("/", protect, upload.single("file"), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) return res.status(400).json({ message: "No file uploaded" });
    const result = await uploadBufferToCloudinary(req.file.buffer, "new-gen-music/media", "auto");
    res.json({ url: result.secure_url, raw: result });
  } catch (err) {
    console.error("Upload route error:", err);
    res.status(500).json({ message: "Upload failed", error: err?.message || err });
  }
});

export default router;
