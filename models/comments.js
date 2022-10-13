const pool = require("../db/connection");

module.exports.removeCommentById = (comment_id) => {
	if (isNaN(comment_id)) {
		return Promise.reject({
			status: 400,
			message: "Invalid argument passed - comment_id must be a number.",
		});
	}
	return pool
		.query("DELETE FROM comments WHERE comment_id = $1", [comment_id])
		.then((result) => {
			return result;
		});
};

