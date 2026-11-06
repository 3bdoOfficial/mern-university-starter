import { NODE_ENV } from "../config/env.js";

const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    data: {
      environment: NODE_ENV,
      timestamp: new Date().toISOString(),
    },
  });
};

export { getHealth };
