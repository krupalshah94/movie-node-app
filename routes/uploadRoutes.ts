import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import type { Request, Response } from "express";

dotenv.config();

const router = express.Router();

// Configure AWS S3
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  region: process.env.AWS_REGION || "",
});

// Configure multer for S3
const upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.S3_BUCKET_NAME || "",
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, `uploads/${Date.now()}_${file.originalname}`);
      },
      contentType: (req, file, cb) => {
        // Set the correct content type based on the file's MIME type
        cb(null, file.mimetype);
      },
    }),
    fileFilter: (req, file, cb) => {
      // Allow only image files
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed!") as unknown as null, false);
      }
      cb(null, true);
    },
  });
  

// API endpoint to upload an image
router.post("/", upload.single("image"), (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded!" });
      return; // Ensure the function exits here
    }
  
    const file = req.file as Express.MulterS3.File;
    res.status(200).json({
      message: "File uploaded successfully!",
      fileUrl: file.location, // The URL of the uploaded file
    });
  });

export default router;
