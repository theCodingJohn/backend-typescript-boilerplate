import { Request, Response } from "express";
import authService from "../services/auth.service";
import tokenService from "../services/token.service";
import httpStatus from "http-status";

import catchAsync from "../utils/catchAsync";

const signup = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.signupUser(req);
  const token = await tokenService.generateAuthToken(user);

  return res.status(httpStatus.CREATED).json({ user, token });
});

const signin = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.signinUser(req);
  const token = await tokenService.generateAuthToken(user);

  return res.status(httpStatus.CREATED).json({ user, token });
});

export default { signup, signin };
