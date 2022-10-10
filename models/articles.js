const pool = require("../db/connection");

module.exports.fetchArticleById = (article_id) => {
	if (isNaN(article_id) === true) {
		return Promise.reject({
			status: 400,
			message: "Invalid argument passed - number expected",
		});
	}
	return pool
		.query("SELECT * FROM articles where article_id = $1", [article_id])
		.then(({ rows: article }) => {
			if (article.length === 0) {
				return Promise.reject({
					status: 404,
					message: "Article id not found in database.",
				});
			}
			return article;
		});
};
