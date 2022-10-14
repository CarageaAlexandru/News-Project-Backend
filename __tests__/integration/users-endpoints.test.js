const {
	articleData,
	commentData,
	topicData,
	userData,
} = require("../../db/data/test-data");
const request = require("supertest");
const sorted = require("jest-sorted");
const app = require("../../app");
const db = require("../../db/connection");
const seed = require("../../db/seeds/seed");
beforeEach(() => seed({ articleData, commentData, topicData, userData }));

afterAll(() => {
	if (db.end) db.end();
});
describe("5. GET /api/users", () => {
	test(`should respond with status: 200 and return an array of objects with following properties:
        username, name, avatar_url`, () => {
		return request(app)
			.get("/api/users")
			.expect(200)
			.then(({ body }) => {
				const { users } = body;
				expect(users).toBeInstanceOf(Array);
				expect(users).toHaveLength(4);
				users.forEach((user) => {
					expect(user).toMatchObject({
						username: expect.any(String),
						name: expect.any(String),
						avatar_url: expect.any(String),
					});
				});
			});
	});
});
describe("17.GET /api/users/:username", () => {
	test("should respond with an object which should have the following properties: username, avatar_url, name.", () => {
		// to check this test again
		const validUsernames = userData.map((user) => {
			return user.username;
		});
		const max = validUsernames.length;
		function getRandomInt(max) {
			return Math.floor(Math.random() * max);
		}
		const randomUsername = getRandomInt(max);
		return request(app)
			.get(`/api/users/${validUsernames[randomUsername]}`)
			.expect(200)
			.then(({ body }) => {
				const { user } = body;
				expect(user).toBeInstanceOf(Object);
				expect(user).toMatchObject({
					username: `${validUsernames[randomUsername]}`,
					name: expect.any(String),
					avatar_url: expect.any(String),
				});
			});
	});
});
