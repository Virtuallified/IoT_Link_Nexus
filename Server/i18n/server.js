const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");

const app = express();

app.use((req, res, next) => {
  // Corrected the order of (req, res) parameters
  console.log(req.method + ": " + req.path);
  next();
});

app.use(
  cors({
    origin: [`${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT || "80"}`],
    methods: "GET, POST", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

app.use("/locales", express.static("locales"));
app.use(error);

module.exports = app;
