const express = require("express");
const { getArticleById } = require("./controllers/articles");
const { getTopics } = require("./controllers/topics");
const { getAllUsers } = require("./controllers/users");
const app = express();

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/users", getAllUsers);

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
