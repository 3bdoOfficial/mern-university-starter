const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    data: {
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
    },
  });
};

export { getHealth };
