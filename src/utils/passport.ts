import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import config from "./config";

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
  },
  async (jwtPayload: JwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.sub);

      if (!user) return done(null, false);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);

export default jwtStrategy;
