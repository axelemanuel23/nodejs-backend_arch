const mongoose = require("mongoose");
const { config } = require("../configs/config");

mongoose.Promise = global.Promise;

const dbUser = encodeURIComponent(config.dbUser);
const dbPass = encodeURIComponent(config.dbPass);
const dbCluster = config.dbCluster;

const uri = `mongodb+srv://${dbUser}:${dbPass}@${dbCluster}/?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: dbName});

const connection = mongoose.connection;

module.exports = { connection };