import { Request, Response } from "express";
import { Movie } from "../models"; // Assuming you have a Movie model

// Create a movie
export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, image, publishDate } = req.body;
    const movie = await Movie.create({ name, image, publishDate });
    res.status(201).json({ message: "Movie created successfully", movie });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Edit a movie
export const editMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, image, publishDate } = req.body;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    await movie.update({ name, image, publishDate });
    res.json({ message: "Movie updated successfully", movie });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// List movies with pagination
export const listMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 8 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const movies = await Movie.findAndCountAll({
      offset,
      limit: Number(limit),
      order: [["updatedAt", "DESC"]],
    });
    res.json({
      movies: movies.rows,
      total: movies.count,
      page: Number(page),
      pages: Math.ceil(movies.count / Number(limit)),
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
