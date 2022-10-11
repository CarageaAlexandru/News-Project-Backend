const pool = require("../db/connection");

module.exports.fetchAllUsers = () => {
	return pool.query("SELECT * FROM users").then(({ rows: users }) => {
		return users;
	});
};
