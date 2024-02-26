// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

const { isAuthenticated } = require("./middleware/jwt.middleware");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const boardRoutes = require("./routes/board.routes");
app.use("/board", /* isAuthenticated, */ boardRoutes);

const kanbanRoutes = require("./routes/kanban.routes");
app.use("/kanban", /* isAuthenticated, */ kanbanRoutes);

const kanbanItemRoutes = require("./routes/kanbanItem.routes");
app.use("/kanban", /* isAuthenticated, */ kanbanItemRoutes);

const notesRoutes = require("./routes/notes.routes");
app.use("/notes", /*isAuthenticated, */ notesRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
