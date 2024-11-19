/* eslint-disable */
import express from "express";
import { createMovie, editMovie, listMovies, getMovieById } from "../controllers/movieController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

// Use the correct middleware and controller setup

router.post("/create", authenticate, createMovie);
router.put("/edit/:id", authenticate, editMovie);
router.get("/list", authenticate, listMovies);
router.get("/get/:id", authenticate, getMovieById);

export default router;
