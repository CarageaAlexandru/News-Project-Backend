const endpointsInfo = require("../endpoints");

module.exports.getAllEndpoints = (request, response) => {
	response.status(200).send({ endpointsInfo });
};
