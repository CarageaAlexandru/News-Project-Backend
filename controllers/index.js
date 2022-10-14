module.exports.getIndexPage = (request, response) => {
	response
		.status(200)
		.send({ message: "Please go to /api for instructions." });
};
