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

describe("12. DELETE /api/comments/:comment_id", () => {
	test("should delete the comment with the given id and respond with status 204", () => {
		return request(app).delete("/api/comments/2").expect(204);
	});
});
