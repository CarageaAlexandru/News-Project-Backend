const express = require("express");
const { getArticleById, patchArticleById } = require("./controllers/articles");
const { getTopics } = require("./controllers/topics");
const { getAllUsers } = require("./controllers/users");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);
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
	// console.log(error);
	if (error.code === "22P02") {
		res.status(400).send({
			message: "Invalid argument passed - number expected.",
		});
	} else if (error.code === "23502") {
		res.status(400).send({
			message: "Invalid object passed - must be inc_votes.",
		});
	} else {
		res.status(500).send("Server Error!");
	}
});



module.exports = app;
