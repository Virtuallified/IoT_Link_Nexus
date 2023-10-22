const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");

const app = express();

// Middleware to log incoming requests
app.use((req, res, next) => {
  // Corrected the order of (req, res) parameters
  console.log(req.method + ": " + req.path);
  next();
});

app.use(
  cors({
    origin: "*", // Not recommended in Production
    // origin: `${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT || "80"}`,
    methods: "GET, POST", // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers as an array
  })
);

app.use("/locales", express.static("locales")); // Serve static files from the "locales" directory
app.use(error); // Error handling middleware

module.exports = app;
