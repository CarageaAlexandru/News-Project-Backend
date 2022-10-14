const { getAllUsers, getUserByUsername } = require("../controllers/users");
const router = require("express").Router();

router.get("/api/users", getAllUsers);
router.get("/api/users/:username", getUserByUsername);

module.exports = router;
