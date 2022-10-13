const { removeCommentById } = require("../models/comments");

module.exports.deleteCommentById = (request, response, next) => {
	const { comment_id } = request.params;
	removeCommentById(comment_id)
		.then((result) => {
			if (result.rowCount === 1) {
				response.status(204).send({
					message: `Comment with ${comment_id} succesfully deleted.`,
				});
			} else if (result.rowCount === 0) {
				response.status(400).send({
					message:
						"Could not delete: could not find a comment matching that ID.",
				});
			}
		})
		.catch((error) => {
			next(error);
		});
};
