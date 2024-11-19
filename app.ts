/* eslint-disable */
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import movieRoutes from "./routes/movieRoutes";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3001", // Allow local frontend
    "https://your-production-domain.com", // Allow production frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow credentials if needed (cookies, tokens, etc.)
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
