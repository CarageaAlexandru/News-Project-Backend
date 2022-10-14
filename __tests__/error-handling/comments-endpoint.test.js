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
    test("should respond with status:400 comment_id is not a number", () => {
        return request(app)
            .delete("/api/comments/42dwa2de3")
            .expect(400)
            .then(({ body }) => {
                const { message } = body;
                expect(message).toBe(
                    "Invalid argument passed - comment_id must be a number."
                );
            });
    });
    test("should respond with status:400 comment_id is not found in database", () => {
        return request(app)
            .delete("/api/comments/4325353")
            .expect(400)
            .then(({ body }) => {
                const { message } = body;
                expect(message).toBe(
                    "Could not delete: could not find a comment matching that ID."
                );
            });
    });
});