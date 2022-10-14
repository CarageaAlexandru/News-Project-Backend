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
describe("8. GET /api/articles", () => {
	test(`should respond with an articles array of article objects each with following properties 
        author - username from users table
        title
        article_id
        topic
        created_at
        votes
        comment_count - total count of comments with the article_id
        The articles should be sorted by date in descending order.`, () => {
		return request(app)
			.get("/api/articles")
			.expect(200)
			.then(({ body }) => {
				const { articles } = body;
				expect(articles).toBeInstanceOf(Array);
				expect(articles).toHaveLength(12);
				expect(articles).toBeSortedBy("created_at", {
					descending: true,
				});
				articles.forEach((article) => {
					expect(article).toMatchObject({
						author: expect.any(String),
						title: expect.any(String),
						topic: expect.any(String),
						created_at: expect.any(String),
						votes: expect.any(Number),
						comment_count: expect.any(Number),
					});
				});
			});
	});
	test(`should accept the following query: topic which filters the topic by specified value
        If the query is omitted the endpoing should respond with all articles`, () => {
		return request(app)
			.get("/api/articles?topic=mitch")
			.expect(200)
			.then(({ body }) => {
				const { articles } = body;
				expect(articles).toBeInstanceOf(Array);
				expect(articles).toHaveLength(11);
				articles.forEach((article) => {
					expect(article).toMatchObject({
						author: expect.any(String),
						title: expect.any(String),
						topic: "mitch",
						created_at: expect.any(String),
						votes: expect.any(Number),
						comment_count: expect.any(Number),
					});
				});
			});
	});
	test("should accept topic as query and filter the topics by specified value", () => {
		return request(app)
			.get("/api/articles?topic=cats")
			.expect(200)
			.then(({ body }) => {
				const { articles } = body;
				expect(articles).toBeInstanceOf(Array);
				expect(articles).toHaveLength(1);
				articles.forEach((article) => {
					expect(article).toMatchObject({
						author: expect.any(String),
						title: expect.any(String),
						topic: "cats",
						created_at: expect.any(String),
						votes: expect.any(Number),
						comment_count: expect.any(Number),
					});
				});
			});
	});
});
describe("9. GET /api/articles/:article_id/comments", () => {
	test(`should respons with an array of comments for the given article_id.
    Each comment should have the following properties:
    comment_id
    votes
    created_at
    author
    body`, () => {
		return request(app)
			.get("/api/articles/1/comments")
			.expect(200)
			.then(({ body }) => {
				const { comments } = body;
				expect(comments).toBeInstanceOf(Array);
				expect(comments).toHaveLength(11);
				expect(comments).toBeSortedBy("created_at", {
					descending: true,
				});
				comments.forEach((comment) => {
					expect(comment).toEqual({
						comment_id: expect.any(Number),
						votes: expect.any(Number),
						created_at: expect.any(String),
						author: expect.any(String),
						body: expect.any(String),
					});
				});
			});
	});
});
describe("10. POST /api/articles/:article_id/comments", () => {
	test(`should post a comment to specified article_id,
    the body should accept and object with following properties:
    username
    body.`, () => {
		const newComment = {
			username: "butter_bridge",
			body: "There's no shame in fear, my father told me, what matters is how we face it.",
		};
		return request(app)
			.post("/api/articles/1/comments")
			.send(newComment)
			.expect(201)
			.then(({ body }) => {
				const { insertedComment } = body;
				expect(insertedComment).toEqual({
					article_id: 1,
					comment_id: expect.any(Number),
					votes: expect.any(Number),
					created_at: expect.any(String),
					author: "butter_bridge",
					body: "There's no shame in fear, my father told me, what matters is how we face it.",
				});
			});
	});
});
describe("11. GET /api/articles (queries)", () => {
	test("should add query: 'sort_by' which can sorty by any valid column", () => {
		"valid columns: title, topic, author, body , votes, created_at";
		return request(app)
			.get("/api/articles?sort_by=votes")
			.expect(200)
			.then(({ body }) => {
				const { articles } = body;
				expect(articles).toBeInstanceOf(Array);
				expect(articles).toHaveLength(12);
				expect(articles).toBeSortedBy("votes", {
					descending: true,
				});
				articles.forEach((article) => {
					expect(article).toMatchObject({
						author: expect.any(String),
						title: expect.any(String),
						topic: expect.any(String),
						created_at: expect.any(String),
						votes: expect.any(Number),
						comment_count: expect.any(Number),
					});
				});
			});
	});
	test("should add query: 'order_by' which can be set to ASC or DESC (defaults to descending)", () => {
		return request(app)
			.get("/api/articles?order=asc")
			.expect(200)
			.then(({ body }) => {
				const { articles } = body;
				expect(articles).toBeInstanceOf(Array);
				expect(articles).toHaveLength(12);
				expect(articles).toBeSortedBy("created_at", {
					descending: false,
				});
				articles.forEach((article) => {
					expect(article).toMatchObject({
						author: expect.any(String),
						title: expect.any(String),
						topic: expect.any(String),
						created_at: expect.any(String),
						votes: expect.any(Number),
						comment_count: expect.any(Number),
					});
				});
			});
	});
});
