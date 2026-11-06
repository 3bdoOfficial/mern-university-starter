import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { CLIENT_URL, NODE_ENV } from "./config/env.js";

import healthRoutes from "./routes/health.routes.js";

import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// Security Middleware
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: CLIENT_URL,
  }),
);

// Request Parsing
app.use(express.json());

// HTTP Request Logging
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API Routes
app.use("/api/health", healthRoutes);

// 404 Handler
app.use(notFound);

// Centralized Error Handler
app.use(errorHandler);

export default app;
