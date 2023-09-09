const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");

const app = express();

app.use((res, req, next) => {
  console.log(res.method);
  console.log(res.path);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/locales", express.static("locales"));
app.use(error);

module.exports = app;
