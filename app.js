const express = require("express");
const { getIndexPage } = require("./controllers");
const apiRouter = require("./routes/api-router");
const articlesRouter = require("./routes/articles-router");
const usersRouter = require("./routes/users-router");
const topicsRouter = require("./routes/topics-router");
const commentsRouter = require("./routes/comments-router");
const {
	handlePSQLErrors,
	handleJavaScriptErrors,
} = require("./controllers/errors");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", getIndexPage);
app.use(apiRouter);
app.use(usersRouter);
app.use(articlesRouter);
app.use(topicsRouter);
app.use(commentsRouter);

app.use(handleJavaScriptErrors);

app.use(handlePSQLErrors);

module.exports = app;
