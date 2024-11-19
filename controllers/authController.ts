import { Request, Response } from "express";
import { User } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the correct return type as Promise<Response>
export const signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    return res.status(201).json({ message: "User created", user });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};
