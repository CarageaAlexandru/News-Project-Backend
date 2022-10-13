const { readFile } = require("fs/promises");

module.exports.getData = (fileName, type) => {
	new Promise((resolve, reject) =>
		readFile(fileName, type, (error, data) => {
			//if has error reject, otherwise resolve
			return error ? reject(error) : resolve(data);
		})
	);
};
