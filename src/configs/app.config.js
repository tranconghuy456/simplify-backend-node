const config = {
  db: {
    isEnable: process.env.MONGO_ENABLE,
    uri: process.env.MONGO_URI,
    timeout: 3000,
    pollsize: 50,
    dbName: process.env.MONGO_DB_NAME,
  },
  app: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
};

module.exports = config;
