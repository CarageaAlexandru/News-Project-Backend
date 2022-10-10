const { fetchTopics } = require("../models/topics");

module.exports.getTopics = (request, response) => {
	fetchTopics()
		.then((topics) => {
			response.status(200).send({ topics });
		})
		.catch((error) => {
			console.log(error);
			next(err);
		});
};
