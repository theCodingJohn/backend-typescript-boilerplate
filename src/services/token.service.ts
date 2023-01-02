import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";
import config from "../utils/config";

const generateAuthToken = (user: IUser) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.JWT_SECRET);

  return token;
};

export default {
  generateAuthToken,
};
