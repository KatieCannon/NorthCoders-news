const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { DB_URL } =
  process.env.NODE_ENV === "production" ? process.env : require("./config");

const apiRouter = require("./routes/api-router");
const { handle400s, handle404s, handle500s } = require("./errors/index");

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Connected to ${DB_URL}`))
  .catch(console.log);


app.use(bodyParser.json());

app.get('/',( req, res, next) => {
    res.sendFile(`${__dirname}/views/api.html`)
});

app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  next({ status: 404, msg: "page not found" });
});

app.use(handle400s);

app.use(handle404s);

app.use(handle500s);

module.exports = app;
