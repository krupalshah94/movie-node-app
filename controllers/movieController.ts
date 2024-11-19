/* eslint-disable */
import { Request, Response } from "express";
import { Movie } from "../models"; // Assuming you have a Movie model

/**
 * Creates a new movie and returns it in the response.
 * @param {Request} req - Request object with the movie data in `req.body`.
 * @param {Response} res - Response object.
 * @returns {Promise<Response>} A promise resolving to a response object with a JSON payload containing the created movie.
 * @throws {Error} If there is a database error or the request body is invalid.
 */
export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, image, publishDate } = req.body;
    const movie = await Movie.create({ name, image, publishDate });
    res.status(201).json({ message: "Movie created successfully", movie });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

/**
 * Updates a movie and returns the updated movie in the response.
 * @param {Request} req - Request object with the movie data in `req.body` and the movie ID in `req.params`.
 * @param {Response} res - Response object.
 * @returns {Promise<Response>} A promise resolving to a response object with a JSON payload containing the updated movie.
 * @throws {Error} If there is a database error or the request body is invalid.
 */
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

/**
 * Retrieves a paginated list of movies and returns them in the response.
 * @param {Request} req - Request object, with pagination parameters `page` and `limit` in `req.query`.
 * @param {Response} res - Response object.
 * @returns {Promise<void>} A promise resolving to a response object with a JSON payload containing the list of movies, total count, current page, and total pages.
 * @throws {Error} If there is a database error or the request query is invalid.
 */
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

/**
 * Retrieves a single movie by its ID and returns it in the response.
 * @param {Request} req - Request object with the ID of the movie to retrieve in `req.params`.
 * @param {Response} res - Response object.
 * @returns {Promise<void>} A promise resolving to a response object with a JSON payload containing the movie.
 * @throws {Error} If there is a database error or the movie is not found.
 */
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
