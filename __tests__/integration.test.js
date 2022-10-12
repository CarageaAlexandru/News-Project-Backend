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
				.get("/api/articles/1")
				.expect(200)
				.then(({ body }) => {
					const { article } = body;
					expect(article).toBeInstanceOf(Object);
					expect(article).toEqual({
						author: "butter_bridge",
						title: "Living in the shadow of a great man",
						article_id: 1,
						body: "I find this existence challenging",
						topic: "mitch",
						created_at: "2020-07-09T20:11:00.000Z",
						votes: 100,
						comment_count: 11,
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
	describe("6. PATCH /api/articles/:article_id", () => {
		test(`should update articles by id : accept an object in the form of 
			{ inc_votes : newVote } and should respond with updated object.`, () => {
			const newVote = { inc_votes: 10 };
			return request(app)
				.patch("/api/articles/1")
				.send(newVote)
				.expect(200)
				.then(({ body }) => {
					const { updated_article } = body;
					expect(updated_article).toBeInstanceOf(Object);
					expect(updated_article).toEqual({
						author: "butter_bridge",
						title: "Living in the shadow of a great man",
						article_id: 1,
						body: "I find this existence challenging",
						topic: "mitch",
						created_at: "2020-07-09T20:11:00.000Z",
						votes: 110,
					});
				});
		});
	});
	describe("7. GET /api/articles/:article_id ", () => {
		test("should return the count of all comments with specified article_id and add comment_count as key", () => {
			return request(app)
				.get("/api/articles/1")
				.expect(200)
				.then(({ body }) => {
					const { article } = body;
					expect(article).toBeInstanceOf(Object);
					expect(article).toEqual({
						author: "butter_bridge",
						title: "Living in the shadow of a great man",
						article_id: 1,
						body: "I find this existence challenging",
						topic: "mitch",
						created_at: "2020-07-09T20:11:00.000Z",
						votes: 100,
						comment_count: 11,
					});
				});
		});
	});
});

describe("Error handing", () => {
	describe("1. GET /api/topics", () => {
		test("1.GET /api/topickssS should respond with status 404 if endpoint is not correct", () => {
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
		test("should respond with status 404 if endpoint is not correct", () => {
			return request(app).get("/api/usersWrong").expect(404);
		});
	});
	describe("4. PATCH /api/articles/:article_id", () => {
		const newVote = { inc_votes: 10 };
		test("should respond with status 400 if endpoint is not correct", () => {
			return request(app)
				.patch("/api/articles/badInput")
				.send(newVote)
				.expect(400)
				.then(({ body }) => {
					const { message } = body;
					expect(message).toBe(
						"Invalid argument passed - number expected."
					);
				});
		});
		test("should respond with status 400 if :/article_id is not a number", () => {
			const newVote = { inc_votes: "invalid" };
			return request(app)
				.patch("/api/articles/1")
				.send(newVote)
				.expect(400)
				.then(({ body }) => {
					const { message } = body;
					expect(message).toBe(
						"Invalid argument passed - number expected."
					);
				});
		});
		test("should respond with status 400 if object is miss spelled", () => {
			const newVote = { inc_voteres: 10 };
			return request(app)
				.patch("/api/articles/1")
				.send(newVote)
				.expect(400)
				.then(({ body }) => {
					const { message } = body;
					expect(message).toBe(
						"Invalid object passed - must be inc_votes."
					);
				});
		});
	});
});
