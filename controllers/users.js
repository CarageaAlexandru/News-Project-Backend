const { fetchAllUsers } = require("../models/users");

module.exports.getAllUsers = (request, response, next) => {
	fetchAllUsers()
		.then((users) => {
			console.log(users);
			response.status(200).send({ users });
		})
		.catch((error) => {
			console.log(error);
		});
};
