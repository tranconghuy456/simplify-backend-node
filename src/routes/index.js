const router = require("express").Router();

// health check application
router.use("/healthcheck", require("./health"));

// check apiKey
// router.use("/api/v1/auth", require("./auth"));

// init routes
// router.use("/auth", require("./auth"));

module.exports = router;
