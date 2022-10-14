module.exports.getIndexPage = (request, response) => {
	response
		.status(200)
		.send("Please go to /api for instructions.");
};
