import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(
      fn(req, res, next).catch((err: any) => {
        console.log({ err });
        next(err);
      })
    );
  };
};

export default catchAsync;
