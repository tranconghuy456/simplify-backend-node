const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const { appConstant } = require("./configs/constants");
const appConfigs = require("./configs/app.config");
const { checkEnable } = require("./utils");

const app = express();
// init middlewares
app.use(morgan("dev"));

// setting security helmet
const helmet = require("helmet");
// setting base
app.use(helmet.frameguard({ action: "deny" }));
// strict transport security
app.use(
  helmet.hsts({
    maxAge: appConstant.REQUEST_DURATION,
  })
);

// content security policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      srciptSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
  })
);

// x content type options
app.use(helmet.noSniff());
// x xss protection
app.use(helmet.xssFilter());
// referrer policy
app.use(helmet.referrerPolicy({ policy: "no-referrer" }));

// downsize response
app.use(
  compression({
    level: 6, // level compress
    threshold: 100 * 1024, // > 100kb threshold to compress
    filter: (req) => {
      return !req.headers["x-no-compress"];
    },
  })
);

// setting body parser, cookie parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// init db
if (checkEnable(appConfigs.db.isEnable)) {
  require("./configs/mongoose.config");
}

// init routes
app.use("", require("./routes"));

module.exports = app;
