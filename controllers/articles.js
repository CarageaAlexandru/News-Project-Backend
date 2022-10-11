const { fetchArticleById, updateArticleById } = require("../models/articles");

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
