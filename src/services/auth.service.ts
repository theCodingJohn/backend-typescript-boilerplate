import { Request } from "express";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import User, { IUser } from "../models/user.model";
import ApiError from "../errors/ApiError";

const signupUser = async (req: Request) => {
  const { username, password, email }: IUser = req.body;
  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    email,
    password: password_hash,
  });

  const savedUser = await user.save();

  return savedUser;
};

const signinUser = async (req: Request) => {
  const { username, password }: IUser = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user !== null ? await bcrypt.compare(password, user.password) : null;

  if (!user || !passwordCorrect) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }

  return user;
};

export default { signupUser, signinUser };
