const catchAsync = require("../helpers/catch.async");
const { OK } = require("../core/success.response");

class HealthController {
  healthCheck = catchAsync((req, res) => {
    // TODO: check redis, rebbit, mongodb
    OK(res, "OK", null);
  });
}

module.exports = new HealthController();
