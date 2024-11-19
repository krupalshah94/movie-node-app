/* eslint-disable */
import express from "express";
import { createMovie, editMovie, listMovies, getMovieById } from "../controllers/movieController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", authenticate, createMovie);
router.put("/edit/:id", authenticate, editMovie);
router.get("/list", authenticate, listMovies);
router.get("/get/:id", authenticate, getMovieById);

export default router;
