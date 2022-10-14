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

describe("1. GET /api/topics", () => {
	test("1.GET /api/topickssS should respond with status 404 if endpoint is not correct", () => {
		return request(app).get("/api/topickssS").expect(404);
	});
});
