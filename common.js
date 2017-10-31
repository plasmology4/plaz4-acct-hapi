var mongoConfig = require('./mongo.config.js');
var mongoose = require('mongoose');

// mongoose.connect("mongodb://"+mongoConfig.host+":"+mongoConfig.port+"/"+mongoConfig.db);
// db = mongoose.connection;

//var mongoUrl = "mongodb://"+mongoConfig.host+":"+mongoConfig.port+"/"+mongoConfig.db;
var mongoUrl = "mongodb://"+mongoConfig.host+"/"+mongoConfig.db;


//var db = mongoose.createConnection(mongoUrl);
//var db = mongoose.createConnection(mongoUrl, mongoConfig.options);

mongoose.connect(mongoUrl);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!
  console.log("Connnected to MongoDB:"+mongoUrl);
});

module.exports = db;