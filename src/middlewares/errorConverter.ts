import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import httpStatus from "http-status";
import ApiError from "../errors/ApiError";

const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message: string = error.message || `${httpStatus[statusCode]}`;
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

export default errorConverter;
