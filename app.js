const express = require("express");
const { getTopics } = require("./controllers/topics");
const app = express();

app.get("/api/topics", getTopics);

// Handling JavaScript errors
app.use((error, req, res, next) => {
	console.log(error.message);
	if (error.status && error.message) {
		res.status(error.status).send({
			message: error.message,
		});
	} else {
		next(error);
	}
});

module.exports = app;
