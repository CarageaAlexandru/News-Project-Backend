const pool = require("../db/connection");

module.exports.fetchTopics = () => {
	
	return pool
		.query("SELECT * FROM topics;")
		.then(({ rows: topics }) => {
			return topics;
		})
};
