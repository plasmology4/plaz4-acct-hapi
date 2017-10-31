
var mongoose = require("mongoose");
var db = require("../common.js");

var p4AccountSchema = mongoose.Schema({
  acct: String
  , acctDesc: String
  , majorType: String
  , subType: String
  , galId: Number
  , gsaId: Number
  , gsaParentId: Number
});

var p4AccountTypeSchema = mongoose.Schema({
  descrip: String
  , id  : Number
  , parentId: Number  
  , level: Number 
  , grp: Number
});

var journalEntrySchema = mongoose.Schema({
  Id: String
  , Description: String
  , Amount: Number
  , DetailType: String
  , JournalEntryLineDetail: {
      PostingType: String
      , AccountRef: {
          value: String
          , name: String
        }
    }
});

var lineSchema = mongoose.Schema({
  Line: [journalEntrySchema]
});

var P4Account = db.model("P4Account", p4AccountSchema);
var P4AccountTypeSchema = db.model("P4AccountTypeSchema", p4AccountTypeSchema);
var JournalEntry = db.model("JournalEntry", lineSchema);


exports.findAll = function(callback) {
  JournalEntry.find({  }, callback);
};

exports.findById = function(id, callback) {
  JournalEntry.findById(id, callback);
};

exports.create = function(doc, callback) {
  JournalEntry.create(doc, callback);
};

exports.update = function(doc, callback) {
  
  console.log('Updating JournalEntry:'+JSON.stringify(doc));
  var id = doc._id;

  // Check for null > this is a new object
  if (!id) {
    id = mongoose.Types.ObjectId();
    doc._id = id;
  }

  console.log("updating org data with id:"+id);
  delete doc._id;

  JournalEntry.update({_id: id}, doc, {upsert: true}, function(err, numberAffected, rawResponse) {
    console.log('err: '+err);
    console.log('numberAffected: '+JSON.stringify(numberAffected));
    console.log('rawResponse: '+JSON.stringify(rawResponse));
    callback(err, numberAffected);
  });
};

exports.delete = function(id, callback) {
  var _id = mongoose.Types.ObjectId(id);
  JournalEntry.findByIdAndRemove(id, callback);
};

