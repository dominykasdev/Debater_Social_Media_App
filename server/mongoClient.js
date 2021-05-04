const MongoClient = require('mongodb').MongoClient;

module.exports = async (url, func) => await MongoClient.connect(url, {useUnifiedTopology: true}, func);
