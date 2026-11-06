import { NODE_ENV } from "../config/env.js";

const errorHandler = (err, req, res, next) => {
  const statusCode =
    err.statusCode ||
    err.status ||
    (res.statusCode >= 400 ? res.statusCode : 500);

  res.status(statusCode).json({
    success: false,

    message: NODE_ENV === "development" ? err.message : "Internal Server Error",

    ...(NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorHandler;
