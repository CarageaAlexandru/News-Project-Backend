const {
	articleData,
	commentData,
	topicData,
	userData,
} = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

beforeEach(() => seed({ articleData, commentData, topicData, userData }));

afterAll(() => {
	if (db.end) db.end();
});

describe("1. GET /api/topics", () => {
	test("should respond with status:200 and display an array of topics with slug and description properties", () => {
		return request(app)
			.get("/api/topics")
			.expect(200)
			.then(({ body }) => {
				const { topics } = body;
				expect(topics).toBeInstanceOf(Array);
				expect(topics).toHaveLength(3);
				topics.forEach((topic) => {
					expect.objectContaining({
						slug: expect.any(String),
						description: expect.any(String),
					});
				});
			});
	});
});

describe("Error handing", () => {
	test("1.GET /api/topickssS should respond with status 404 and display a message for the user", () => {
		return request(app).get("/api/topickssS").expect(404);
	});
});
