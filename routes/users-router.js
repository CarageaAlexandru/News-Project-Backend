const { getAllUsers } = require("../controllers/users");
const router = require("express").Router();

router.get("/api/users", getAllUsers);

module.exports = router;
