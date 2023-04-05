"use strict";

const express = require("express");
const { NotFoundError } = require("./expressError");
const app = express();

const userRoutes = require("./itemRoutes");
const { logger, onlyAllowElie } = require("./middleware");

app.use(express.json());

// this applies to all requests at all paths
app.use(logger);

// apply a prefix to every route in itemRoutes
app.use("/items", itemRoutes);


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});


module.exports = app;