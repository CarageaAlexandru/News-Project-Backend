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
