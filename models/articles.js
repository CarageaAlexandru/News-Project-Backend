const pool = require("../db/connection");

module.exports.fetchAllArticles = (
	sort_by = "created_at",
	order = "desc",
	topic
) => {
	const validSortingQueries = [
		"title",
		"topic",
		"author",
		"body",
		"votes",
		"created_at",
		"comment_count",
	];
	const validOrderQueries = ["asc", "desc"];
	const queryParams = [];
	if (!validSortingQueries.includes(sort_by)) {
		return Promise.reject({
			status: 400,
			message: "Invalid sort query value.",
		});
	} else if (!validOrderQueries.includes(order)) {
		return Promise.reject({
			status: 400,
			message: "Invalid order query value.",
		});
	}
	let baseQuery = `
			SELECT articles.author, articles.title, articles.article_id,
			articles.topic,articles.created_at, articles.votes,
			COUNT (comments.article_id)::INT AS comment_count
			FROM
			comments
			RIGHT JOIN articles
			ON
			comments.article_id = articles.article_id
			`;
	if (topic) {
		queryParams.push(topic);
		baseQuery += `
		WHERE topic LIKE $1
		GROUP BY (articles.article_id)
		ORDER BY ${sort_by} ${order};
		`;
	} else {
		baseQuery += `
		GROUP BY (articles.article_id)
		ORDER BY ${sort_by} ${order};
		`;
	}
	return pool
		.query(baseQuery, queryParams)
		.then(({ rows: articles }) => {
			if (articles.length === 0) {
				return Promise.reject({
					status: 200,
					message:
						"There are no matches based on specified topic in the database.",
				});
			}
			return articles;
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};

module.exports.fetchArticleById = (article_id) => {
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
			articles
			LEFT JOIN comments
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

module.exports.fetchCommentsByArticleId = (article_id) => {
	return pool
		.query(
			`
			SELECT comment_id, votes, created_at, author, body FROM comments
			WHERE article_id = $1
			ORDER BY created_at DESC;`,
			[article_id]
		)
		.then(({ rows: comments }) => {
			if (comments.length === 0) {
				return Promise.reject({
					status: 404,
					message:
						"There are no matches based on specified article_id in the database.",
				});
			}
			return comments;
		});
};

module.exports.insertCommentByArticleId = (newComment, article_id) => {
	const { username, body } = newComment;
	if (isNaN(article_id)) {
		return Promise.reject({
			status: 400,
			message: "Invalid argument passed - number expected.",
		});
	}
	if (
		username === undefined ||
		body === undefined ||
		username.length === 0 ||
		body.length === 0
	) {
		return Promise.reject({
			status: 400,
			message:
				"Object properties are not valid - username and body should not be empty.",
		});
	}

	return pool
		.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
		.then(({ rows: id }) => {
			if (id.length === 0) {
				return Promise.reject({
					status: 404,
					message:
						"There are no matches based on specified article_id in the database.",
				});
			}
		})
		.then(() => {
			return pool
				.query(
					`
					INSERT INTO comments(article_id, author, body)
					VALUES ($1, $2, $3)
					RETURNING *;`,
					[article_id, username, body]
				)
				.then(({ rows: insertedComment }) => {
					return insertedComment[0];
				});
		});
};
