import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user == null) {
    return res.status(400).json({
      message: "user not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET || "",
    {
      expiresIn: "30m",
    },
  );

  res.status(200).json({
    message: "Login Successful",
    token,
  });
};
export const registerUser = async (req: Request, res: Response) => {
  const { email, firstName, phoneNumber, lastName, password } = req.body;

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).json({
      message: "Email already exist",
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    firstName,
    phoneNumber,
    lastName,
    password: hashed,
  });

  res.status(200).json({
    message: "User Created successfully",
  });
};
