const express = require("express");
const {
	getArticleById,
	patchArticleById,
	getAllArticles,
	getCommentsByArticleId,
	postCommentByArticleId,
} = require("./controllers/articles");
const { deleteCommentById } = require("./controllers/comments");
const { getAllEndpoints } = require("./controllers/endpoints");
const { getTopics } = require("./controllers/topics");
const { getAllUsers } = require("./controllers/users");
const app = express();

app.use(express.json());

app.get("/",)
app.get("/api", getAllEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);
app.patch("/api/articles/:article_id", patchArticleById);
app.get("/api/users", getAllUsers);
app.get("/api/articles", getAllArticles);
app.delete("/api/comments/:comment_id", deleteCommentById);

app.use((error, req, res, next) => {
	if (error.status && error.message) {
		res.status(error.status).send({
			message: error.message,
		});
	} else {
		next(error);
	}
});

app.use((error, req, res, next) => {
	if (error.code === "22P02") {
		res.status(400).send({
			message: "Invalid argument passed - number expected.",
		});
	} else if (error.code === "23502") {
		res.status(400).send({
			message: "Invalid object passed - must be inc_votes.",
		});
	} else if (error.code === "23503") {
		res.status(400).send({
			message: "Username must be in the database.",
		});
	} else {
		res.status(500).send("Server Error!");
	}
});

module.exports = app;
