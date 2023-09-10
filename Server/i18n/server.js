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
    origin: `${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT || "80"}`,
  })
);

app.use("/locales", express.static("locales"));
app.use(error);

module.exports = app;
