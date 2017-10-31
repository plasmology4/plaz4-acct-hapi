'use strict';

console.log("Loading journal entry routes");

module.exports = function routes(options) {
  const Joi = require('joi');
  return [{
    method: 'GET',
    path: '/journalentry/{journalEntryId}',
    config: {
      handler: getJournalEntryById,
      notes: 'Returns the Journal Entry for the journalEntryId',
      tags: ['api'], 
    }
  }, {
    method: 'GET',
    path: '/journalentry',
    config: {
      handler: getAllJournalEntries,
      notes: 'Returns all Journal Entries',
      tags: ['api'], 
    }
  }, {
    method: 'POST',
    path: '/journalentry',
    config: {
      handler: saveJournalEntry,
      notes: 'Saves the Journal Entry',
      tags: ['api'], 
    }
  }, {
    method: 'DELETE',
    path: '/journalentry/{id}',
    config: {
      handler: deleteJournalEntryById,
      notes: 'Deletes the Journal Entry',
      tags: ['api'], 
    }
  }, {
    method: 'GET',
    path: '/parse-types',
    config: {
      handler: parseAccountTypesFromFile,
      notes: 'Parses account types from local CSV file',
      tags: ['api'], 
    }
  }, {
    method: 'GET',
    path: '/parse-accounts',
    config: {
      handler: parseAccountsFromFile,
      notes: 'Parses accounts from local CSV file',
      tags: ['api'], 
    }
  }, {
    method: 'GET',
    path: '/parse-entries',
    config: {
      handler: parseJournalEntriesFromFile,
      notes: 'Parses entries from local CSV file',
      tags: ['api'], 
    }
  }, {
    method: 'GET',
    path: '/test-company-info',
    config: {
      handler: testGetCompany,
      notes: 'Gets info from QBO',
      tags: ['api'], 
    }
  }
  ];
};

const journalEntry = require("../handlers/acct");
const parser = require("../handlers/parser");
const qboConnector =  require("../handlers/qbo-api-connector");

function getAllJournalEntries(request, reply) {
  console.log("Calling findAllJournalEntries");
  journalEntry.findAllJournalEntries(function(err, data) {
    return checkAndReply(err, data, reply);
  });
}

function getJournalEntryById(request, reply) {
  if (request.params.journalEntryId) {
    console.log("Calling findJournalEntryById:" + request.params.journalEntryId);
    journalEntry.findJournalEntryById(request.params.journalEntryId, function(err, data) {
      return checkAndReply(err, data, reply);
    });
  } else {
    reply({msg: "No journalEntryId given"});
  }
}

function deleteJournalEntryById(request, reply) {
  if (request.params.id) {
    console.log("Calling deleteJournalEntry:" + request.params.id);
    journalEntry.deleteJournalEntry(request.params.id, function(err, data) {
      return checkAndReply(err, data, reply);
    });
  } else {
    reply({msg: "No id given"});
  }
}

function saveJournalEntry(request, reply) {
  if (request.payload) {
    console.log("Calling upsertJournalEntry:" + JSON.stringify(request.payload.journalEntry));
    var object = request.payload.journalEntry;
    journalEntry.upsertJournalEntry(object, function(err, data) {
      return checkAndReply(err, data, reply);
    });
  } else {
    reply({msg: "No name given"});
  }
}

function checkAndReply(err, data, reply) {
  if (err) {
      return console.error(err);
    } else {
      if (!data) { 
        return reply({msg: "No data found"}); 
      }
      return reply(data);
    }
}

function parseAccountTypesFromFile(request, reply) {
  console.log("Calling parseAccountTypesFromFile...");
  parser.parseAccountTypesFromFile('../plaz4-acct-hapi/data/account-types.csv', function(err, types){
    if (err) {
      console.log('Error parsing file: '+err);
      return reply(err);
    } else {
      console.log('Parsed ' + types.length + ' types');
      return reply(types);
    }
  });
}

function parseAccountsFromFile(request, reply) {
  console.log("Calling parseAccountsFromFile...");
    parser.parseAccountsFromFile('../plaz4-acct-hapi/data/coa.csv', function(err, accounts){
    if (err) {
      console.log('Error parsing file: '+err);
      return reply(err);
    } else {
      console.log('Parsed ' + accounts.length + ' accounts');
      return reply(accounts);
    }
  });
}

function parseJournalEntriesFromFile(request, reply) {
  console.log("Calling parseJournalEntriesFromFile...");
    parser.parseJournalEntriesFromFile('../plaz4-acct-hapi/data/journal-entries.csv', function(err, entries){
    if (err) {
      console.log('Error parsing file: '+err);
      return reply(err);
    } else {
      console.log('Parsed ' + entries.length + ' non-zero journal entries');
      return reply(entries);
    }
  });
}

function testGetCompany(request, reply) {
  console.log("Calling getCompanyInfoTest...");
  const companyId = '193514574648884';
  qboConnector.getCompanyInfoTest(companyId, function(err, data){
    if (err) {
      console.log('Error getting data: '+err);
      return reply(err);
    } else {
      console.log('Data Returned from QBO Connector: ' + JSON.stringify(data));
      return reply(data);
    }
  });
}

console.log("Accounting routes loaded.");