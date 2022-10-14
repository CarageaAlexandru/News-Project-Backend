const { getTopics } = require("../controllers/topics");

const router = require("express").Router();

router.get("/api/topics", getTopics);

module.exports = router;
