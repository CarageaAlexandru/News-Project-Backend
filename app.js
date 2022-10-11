const express = require("express");
const { getArticleById } = require("./controllers/articles");
const { getTopics } = require("./controllers/topics");
const app = express();

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

// Handling JavaScript errors
app.use((error, req, res, next) => {
	if (error.status && error.message) {
		res.status(error.status).send({
			message: error.message,
		});
	} else {
		next(error);
	}
});

// Handling psql errors
app.use((error, req, res, next) => {
	if (error.code === "22P02") {
		res.status(400).send({ message: error.message });
	} else {
		res.status(500).send("Server Error!");
	}
});

module.exports = app;
