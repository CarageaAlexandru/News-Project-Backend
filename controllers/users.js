const { fetchAllUsers } = require("../models/users");

module.exports.getAllUsers = (request, response, next) => {
	fetchAllUsers()
		.then((users) => {
			response.status(200).send({ users });
		})
};
