const { Router } = require("express");

const ErrorHandler = Router();

ErrorHandler.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(200);
  next(error);
});

ErrorHandler.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: error.message,
    stack: process.env.NODE_ENV === "production" ? "😄" : error.stack,
  });
});

module.exports = ErrorHandler;
