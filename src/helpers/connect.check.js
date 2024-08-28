const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const SECONDS = 10000;

// count connect
const countConnect = () => {
  const numberOfConnect = mongoose.connections.length;
  console.info(`[MONGO_CONNS]::${numberOfConnect}`);
};

const checkOverload = () => {
  setInterval(() => {
    const numberConnection = mongoose.connections.length;
    const numberCores = os.cpus().length;
    const memoryUse = process.memoryUsage().rss;
    // max connections - default 5 connections
    const maxConnections = numberCores * 5;

    if (numberConnection > maxConnections) {
      console.info(`[MONGO_WARN]::Overload detected!`);
    }
  }, SECONDS);
};

module.exports = {
  countConnect,
  checkOverload,
};
