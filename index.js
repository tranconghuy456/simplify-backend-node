require("dotenv").config();

const nodeEnv = process.env.NODE_ENV;

// style console
const { info, error } = console;
console.info = (arg) => {
  info.call(console, `\x1b[33m${arg}\x1b[0m`);
};
console.log = (arg) => {
  info.call(console, `\x1b[32m${arg}\x1b[0m`);
};
console.error = (arg) => {
  error.call(console, `\x1b[31m${arg}\x1b[0m`);
};

// config dotenv by environment
require("dotenv").config({
  path: `.env.${nodeEnv}`,
});

const PORT = process.env.PORT || 3055;
console.info(`[NODE_ENV]::${nodeEnv} || [NODE_PORT]::${PORT}`);

const app = require("./src/app");
const server = app.listen(PORT, (error) => {
  if (error) {
    console.error(`[NODE_ERROR]::${error}`);
    process.exit(1);
  }

  console.log(
    `[NODE_RUN]::${process.env.SERVICE_NAME} start with port ${PORT}`
  );
});

process.on("SIGINT", () => {
  server.close("Exit server express");
});
