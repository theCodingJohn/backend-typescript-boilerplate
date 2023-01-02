import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import config from "../utils/config";
import logger from "../utils/logger";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.NODE_ENV === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = "Internal Server Error";
  }

  res.locals["errorMessage"] = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.NODE_ENV === "development" && { stack: err.stack }),
  };

  if (config.NODE_ENV === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export default errorHandler;
