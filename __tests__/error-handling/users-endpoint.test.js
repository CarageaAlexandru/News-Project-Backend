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

describe("3. GET /api/users", () => {
    test("should respond with status 404 if endpoint is not correct", () => {
        return request(app).get("/api/usersWrong").expect(404);
    });
});