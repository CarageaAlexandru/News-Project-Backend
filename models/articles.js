const pool = require("../db/connection");

module.exports.fetchArticleById = (article_id) => {
	// do i need to add same error handling to patch route?
	if (isNaN(article_id) === true) {
		return Promise.reject({
			status: 400,
			message: "Invalid argument passed - number expected",
		});
	}
	return pool
		.query(
			`
			SELECT articles.* ,
			COUNT (comments.article_id)::INT AS comment_count
			FROM
			comments
			LEFT JOIN articles
			ON
			articles.article_id = comments.article_id
			WHERE articles.article_id = $1
			GROUP BY (articles.article_id)
`,
			[article_id]
		)
		.then(({ rows: article }) => {
			if (article.length === 0) {
				return Promise.reject({
					status: 404,
					message: "Article id not found in database.",
				});
			}
			return article[0];
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};

module.exports.updateArticleById = (article_id, newVote) => {
	const updateVotesBy = newVote.inc_votes;
	return pool
		.query(
			`
		UPDATE articles
		SET votes = votes + $1
		WHERE article_id = $2 RETURNING *;`,
			[updateVotesBy, article_id]
		)
		.then(({ rows: updatedArticle }) => {
			return updatedArticle[0];
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};
