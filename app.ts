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
    "http://localhost:3001", 
    "https://movie-next-app-phi.vercel.app", 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true,
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
