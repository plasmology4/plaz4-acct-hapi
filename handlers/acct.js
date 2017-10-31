var acct = require("../model/acct");

exports.findAllJournalEntries = function (callback) {
  console.log("findAllJournalEntries");
  acct.findAll(callback);
}

exports.findJournalEntryByName = function (name, callback) {
  console.log("findJournalEntryByName: "+ name);
  acct.findByName(name, callback);
}

exports.deleteJournalEntry = function (id, callback) {
  console.log("deleteJournalEntry: "+ id);
  acct.delete(id, callback);
}

exports.upsertJournalEntry = function(object, callback) {
  console.log("upsertJournalEntry:" + JSON.stringify(object));
  console.log("upsert object type:" + (typeof object));
  console.log("upsertJournalEntry._id:" + object['_id']);
  acct.update(object, callback);	
}


