import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import morgan from "morgan";
import logger from "./utils/logger";
import config from "./utils/config";
import jwtStrategy from "./utils/passport";
import routes from "./routes/v1";
import middlewares from "./middlewares";

const app = express();

const MONGODB_URI = config.MONGODB_URI;
console.log(MONGODB_URI);

logger.info("Connecting to DB...");
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("Connected to DB");
  })
  .catch((error) => {
    logger.info("Connection Error", error);
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/v1", routes);

app.use(middlewares.unknownEndpoint);

app.use(middlewares.errorConverter);

app.use(middlewares.errorHandler);

export default app;
