/* eslint-disable */
import express, { Request, Response } from "express";
import { signup, login } from "../controllers/authController";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  console.log(req.body);
  
  await signup(req, res);
});

router.post("/login", async (req: Request, res: Response) => {
  await login(req, res);
});

export default router;
