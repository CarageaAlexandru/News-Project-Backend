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
describe("5. GET /api/articles", () => {
	test(`should return status:200 if sorting query: "topic" does not exist in database.`, () => {
		return request(app)
			.get("/api/articles?topic=badInput")
			.expect(200)
			.then(({ body }) => {
				const { message } = body;
				expect(message).toBe(
					"There are no matches based on specified topic in the database."
				);
			});
	});
});
describe("6. GET /api/articles/:article_id/comments", () => {
	test(`should return status:404 article_id does not exist in database.`, () => {
		return request(app)
			.get("/api/articles/9899532/comments")
			.expect(404)
			.then(({ body }) => {
				const { message } = body;
				expect(message).toBe(
					"There are no matches based on specified article_id in the database."
				);
			});
	});
});
describe("7. POST /api/articles/:article_id/comments", () => {
	test("should respond with status:400 if properties are miss-spelled", () => {
		const missSpelledPropertiesComment = {
			useeername: "butter",
			bodyyy: "test error handling",
		};
		return request(app)
			.post("/api/articles/2/comments")
			.send(missSpelledPropertiesComment)
			.expect(400)
			.then(({ body }) => {
				const { message } = body;
				expect(message).toBe(
					"Object properties are not valid - username and body should not be empty."
				);
			});
	});
	test("should respond with status:400 if empty properties are passed in", () => {
		const emptyPropertiesComment = {
			username: "",
			body: "",
		};
		return request(app)
			.post("/api/articles/2/comments")
			.send(emptyPropertiesComment)
			.expect(400)
			.then(({ body }) => {
				const { message } = body;
				expect(message).toBe(
					"Object properties are not valid - username and body should not be empty."
				);
			});
	});
	test("should respond with status:404 if article_id is not in the database and display no matching record", () => {
		const commentNotMatchingId = {
			username: "butter_bridge",
			body: "There's no shame in fear, my father told me, what matters is how we face it.",
		};
		return request(app)
			.post("/api/articles/9899532/comments")
			.send(commentNotMatchingId)
			.expect(404)
			.then(({ body }) => {
				const { message } = body;
				expect(message).toBe(
					"There are no matches based on specified article_id in the database."
				);
			});
	});
	test("should respond with status:400 if username does not exist in database.", () => {
		const userNotInDatabase = {
			username: "notInDatabase",
			body: "Aut fugiat eos distinctio culpa est est maxime. Maiores nihil quos velit minus beatae. Dolore eos tenetur voluptates nemo.",
		};
		return request(app)
			.post("/api/articles/2/comments")
			.send(userNotInDatabase)
			.expect(400)
			.then(({ body }) => {
				const { message } = body;
				expect(message).toBe("Username must be in the database.");
			});
	});
	test("should respond with status:400 article_id is not a number", () => {
		return request(app)
			.post("/api/articles/notANumber/comments")
			.expect(400)
			.then(({ body }) => {
				const { message } = body;
				expect(message).toBe(
					"Invalid argument passed - number expected."
				);
			});
	});
});
describe("8 GET /api/articles (queries)", () => {
	test("should return status: 400 for invalid sort_query", () => {
		return request(app)
			.get("/api/articles?sort_by=wrongSortingValue")
			.expect(400)
			.then(({ body }) => {
				const { message } = body;
				expect(message).toBe("Invalid sort query value.");
			});
	});
	test("should return status: 400 for invalid order query", () => {
		return request(app)
			.get("/api/articles?order=wrongOrderValue")
			.expect(400)
			.then(({ body }) => {
				const { message } = body;
				expect(message).toBe("Invalid order query value.");
			});
	});
});
