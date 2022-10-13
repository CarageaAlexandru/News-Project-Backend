const { resolve } = require("path");
const { getData } = require("../models/endpoints");

module.exports.getAllEndpoints = (request, response) => {
	const absolutePath = resolve("../endpoints.json");
	getData(absolutePath, "utf8")
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.log(error);
		});
};