import app from "./app.js";

import connectDB from "./config/database.js";

import { PORT } from "./config/env.js";

const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();

    // Start HTTP Server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);

    process.exit(1);
  }
};

startServer();
