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

describe("Endpoint integration", () => {
	describe("1. GET /api/topics", () => {
		test("should respond with status: 200 and display an array of topics with slug and description properties", () => {
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
	describe("2. GET /api/articles/:article_id", () => {
		test(`should respond with status: 200 and display an article object with following properties:
			author - username from the users table
			title, article_id, body, topic, created_at, votes`, () => {
			return request(app)
				.get("/api/articles/2")
				.expect(200)
				.then(({ body }) => {
					const { article } = body;
					expect(article).toBeInstanceOf(Object);
					expect.objectContaining({
						author: "jessjelly",
						title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
						article_id: 2,
						body: "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
						topic: "coding",
						created_at: "2020-05-14 01:02:00",
						votes: 0,
					});
				});
		});
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
						expect.objectContaining({
							username: expect.any(String),
							name: expect.any(String),
							avatar_url: expect.any(String),
						});
					});
				});
		});
	});
});
describe("Error handing", () => {
	describe("1. GET /api/topics", () => {
		test("1.GET /api/topickssS should respond with status 404 ", () => {
			return request(app).get("/api/topickssS").expect(404);
		});
	});
	describe("2. GET /api/articles/:article_id", () => {
		test("should respond with 400 if invalid article_id is passed", () => {
			return request(app)
				.get("/api/articles/article")
				.expect(400)
				.then(({ body }) => {
					const { message } = body;
					expect(message).toBe(
						"Invalid argument passed - number expected"
					);
				});
		});
		test("should respond with 404 if article_id is not found in the database", () => {
			return request(app)
				.get("/api/articles/99999")
				.expect(404)
				.then(({ body }) => {
					const { message } = body;
					expect(message).toBe("Article id not found in database.");
				});
		});
	});
	describe("3. GET /api/users", () => {
		test("should respond with status 404", () => {
			return request(app).get("/api/usersWrong").expect(404);
		});
	});
});
