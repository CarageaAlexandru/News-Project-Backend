const { getAllEndpoints } = require("../controllers/endpoints");
const router = require("express").Router();

router.get("/api", getAllEndpoints);

module.exports = router;
