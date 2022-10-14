function handlePSQLErrors(error, req, res, next) {
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
}

function handleJavaScriptErrors(error, req, res, next) {
	if (error.status && error.message) {
		res.status(error.status).send({
			message: error.message,
		});
	} else {
		next(error);
	}
}

module.exports = { handlePSQLErrors, handleJavaScriptErrors };
