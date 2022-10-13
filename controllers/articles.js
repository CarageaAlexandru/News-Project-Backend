const {
	fetchArticleById,
	updateArticleById,
	fetchAllArticles,
	fetchCommentsByArticleId,
	insertCommentByArticleId,
} = require("../models/articles");

module.exports.getAllArticles = (request, response, next) => {
	const { topic } = request.query;
	fetchAllArticles(topic)
		.then((articles) => {
			response.status(200).send({ articles });
		})
		.catch((error) => {
			next(error);
		});
};

module.exports.getArticleById = (request, response, next) => {
	const { article_id } = request.params;
	fetchArticleById(article_id)
		.then((article) => {
			response.status(200).send({ article });
		})
		.catch((error) => {
			next(error);
		});
};

module.exports.patchArticleById = (request, response, next) => {
	const { article_id } = request.params;
	const newVote = request.body;
	updateArticleById(article_id, newVote)
		.then((updated_article) => {
			response.status(200).send({ updated_article });
		})
		.catch((error) => {
			next(error);
		});
};

module.exports.getCommentsByArticleId = (request, response, next) => {
	const { article_id } = request.params;
	fetchCommentsByArticleId(article_id)
		.then((comments) => {
			response.status(200).send({ comments });
		})
		.catch((error) => {
			next(error);
		});
};

module.exports.postCommentByArticleId = (request, response, next) => {
	const newComment = request.body;
	const { article_id } = request.params;
	insertCommentByArticleId(newComment, article_id)
		.then((insertedComment) => {
			response.status(201).send({ insertedComment });
		})
		.catch((error) => {
			next(error);
		});
};
