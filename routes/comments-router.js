const { deleteCommentById } = require("../controllers/comments");

const router = require("express").Router();

router.delete("/api/comments/:comment_id", deleteCommentById);

module.exports = router;
