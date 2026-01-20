import { Request, Response } from "express";
import User from "../models/User";

export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.status(200).json({
    email,
    password,
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

  const user = await User.create({
    email,
    firstName,
    phoneNumber,
    lastName,
    password,
  });

  res.status(200).json({
    user,
    message: "User Created successfully",
  });
};
