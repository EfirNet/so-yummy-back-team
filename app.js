const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const favoriteRouter = require("./routes/api/favorite");
const ingredientsRouter = require("./routes/api/ingredients");
const recipesRouter = require("./routes/api/recipes");
const subscribeRoutes = require("./routes/api/subscribe");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/favorite", favoriteRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;