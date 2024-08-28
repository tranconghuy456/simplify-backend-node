"use strict";

const mongoose = require("mongoose");
const {
  db: { uri, timeout, pollsize, dbName },
} = require("./app.config");
const { countConnect } = require("../helpers/connect.check");

console.info(`[MONGO_URI]::${uri}`);
mongoose.set("strictQuery", true);

class Database {
  constructor() {
    this.connect();
  }

  // connect
  connect(type = "mongodb") {
    mongoose.set("debug", true);
    mongoose.set("debug", { color: true });

    // connect action
    mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: timeout,
        maxPoolSize: pollsize,
        dbName,
      })
      .then((_) => {
        try {
          countConnect();
        } catch (e) {
          console.error(`[MONGO_ERROR]::${e}`);
        }
        (_) => console.log("[MONGO_CONNECT]::Connected mongodb success");
      })
      .catch((e) => console.error(`[MONGO_ERROR]::${e}`));

    // mongoose states
    mongoose.connection.on("connected", () => {
      console.log("[MONGO_CONNECT]::Mongodb connected to db success");
    });

    mongoose.connection.on("error", (e) => {
      console.error(`[MONGO_ERROR]::${e}`);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("[MONGO_CONNECT]::Disconnected mongodb success");
    });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
