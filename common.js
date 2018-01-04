var mongoConfig = require('./mongo.config.js');
var mongoose = require('mongoose');

// mongoose.connect("mongodb://"+mongoConfig.host+":"+mongoConfig.port+"/"+mongoConfig.db);
// db = mongoose.connection;

//var mongoUrl = "mongodb://"+mongoConfig.host+":"+mongoConfig.port+"/"+mongoConfig.db;
var mongoUrl = "mongodb://"+mongoConfig.host+"/"+mongoConfig.db;


//var db = mongoose.createConnection(mongoUrl);
//var db = mongoose.createConnection(mongoUrl, mongoConfig.options);

var options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

mongoose.connect(mongoUrl, options);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!
  console.log("Connnected to MongoDB:"+mongoUrl);
});

module.exports = db;