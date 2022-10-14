const pool = require("../db/connection");

module.exports.fetchAllUsers = () => {
	return pool.query("SELECT * FROM users").then(({ rows: users }) => {
		return users;
	});
};

module.exports.fetchUserByUsername = (username) => {
	return pool
		.query("SELECT * FROM users WHERE username LIKE $1", [username])
		.then(({ rows: user }) => {
			if (user.length === 0) {
				return Promise.reject({
					status: 404,
					message: "Username not found in database.",
				});
			}
			return user[0];
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};
