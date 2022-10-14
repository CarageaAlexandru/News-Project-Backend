const {
	getAllArticles,
	getArticleById,
	getCommentsByArticleId,
	postCommentByArticleId,
	patchArticleById,
} = require("../controllers/articles");

const router = require("express").Router();

router.get("/api/articles", getAllArticles);
router.get("/api/articles/:article_id", getArticleById);
router.get("/api/articles/:article_id/comments", getCommentsByArticleId);
router.post("/api/articles/:article_id/comments", postCommentByArticleId);
router.patch("/api/articles/:article_id", patchArticleById);

module.exports = router;
