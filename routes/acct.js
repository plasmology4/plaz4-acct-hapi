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
    path: '/parse-entries/{year}',
    config: {
      handler: parseJournalEntriesFromFile,
      notes: 'Parses entries from local CSV file',
      tags: ['api'], 
    }
  }, {
    method: 'GET',
    path: '/parse-entries/{year}/{period}',
    config: {
      handler: parseJournalEntriesFromFile,
      notes: 'Parses entries from local CSV file',
      tags: ['api'], 
    }
  }, {
    method: 'GET',
    path: '/parse-ap-invoices',
    config: {
      handler: parseApInvoicesFromFile,
      notes: 'Parses AP invoices from local CSV file',
      tags: ['api'], 
    }
  }, {
    method: 'GET',
    path: '/parse-ap-invoices/{invoiceNo}',
    config: {
      handler: parseApInvoicesFromFile,
      notes: 'Parses invoices from local CSV file',
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

function getAllJournalEntries(request, h) {
  console.log("Calling findAllJournalEntries");
  journalEntry.findAllJournalEntries(function(err, data) {
    return checkResponse(err, data);
  });
}

function getJournalEntryById(request, h) {
  if (request.params.journalEntryId) {
    console.log("Calling findJournalEntryById:" + request.params.journalEntryId);
    journalEntry.findJournalEntryById(request.params.journalEntryId, function(err, data) {
      return checkResponse(err, data);
    });
  } else {
    return {msg: "No journalEntryId given"};
  }
}

function deleteJournalEntryById(request, h) {
  if (request.params.id) {
    console.log("Calling deleteJournalEntry:" + request.params.id);
    journalEntry.deleteJournalEntry(request.params.id, function(err, data) {
      return checkResponse(err, data);
    });
  } else {
    return {msg: "No id given"};
  }
}

function saveJournalEntry(request, h) {
  if (request.payload) {
    console.log("Calling upsertJournalEntry:" + JSON.stringify(request.payload.journalEntry));
    var object = request.payload.journalEntry;
    journalEntry.upsertJournalEntry(object, function(err, data) {
      return checkResponse(err, data);
    });
  } else {
    return {msg: "No name given"};
  }
}

function checkResponse(err, data) {
  if (err) {
      return console.error(err);
    } else {
      if (!data) { 
        return {msg: "No data found"}; 
      }
      return data;
    }
}

async function parseAccountTypesFromFile(request, h) {
  console.log("Calling parseAccountTypesFromFile...");
  
  var data;
  await parser.parseAccountTypesFromFile('../plaz4-acct-hapi/data/account-types.csv')
    .then(items => {
      data = items;
    })
    .catch(async err => {
      console.error('Error parsing file: '+JSON.stringify(err));
      data = JSON.stringify(err);
    });  

  return data;
}

async function parseAccountsFromFile(request, h) {
  console.log("Calling parseAccountsFromFile...");

  var data;
  await parser.parseAccountsFromFile('../plaz4-acct-hapi/data/coa.csv')
    .then(items => {
      data = items;
    })
    .catch(async err => {
      console.error('Error parsing file: '+JSON.stringify(err));
      data = JSON.stringify(err);
    });  

  return data;
}

async function parseJournalEntriesFromFile(request, h) {
  console.log("Calling parseJournalEntriesFromFile...");
  console.log("Calling parseJournalEntriesFromFile: year " + request.params.year);
  console.log("Calling parseJournalEntriesFromFile: period " + request.params.period);

  var filter = {};
  if (request.params.year) {
    filter['year']=request.params.year;
    if (request.params.period) filter['period']=request.params.period;
  } else {
    filter = null;
  }

  var data;
  await parser.parseJournalEntriesFromFile('../plaz4-acct-hapi/data/journal-entries.csv', filter)
    .then(items => {
      console.log('Parsed ' + items.length + ' non-zero journal entries');
      data = items;
    })
    .catch(async err => {
      console.error('Error parsing file: '+JSON.stringify(err));
      data = JSON.stringify(err);
    });  

  return data;
}

async function parseApInvoicesFromFile(request, h) {
  console.log("Calling parseApInvoicesFromFile...");

  var data;
  await parser.parseApInvoicesFromFile('../plaz4-acct-hapi/data/ap-invoices.csv', request.params.invoiceNo)
    .then(items => {
      console.log('Parsed ' + items.length + ' non-zero journal entries');
      data = items;
    })
    .catch(async err => {
      console.error('Error parsing file: '+JSON.stringify(err));
      data = JSON.stringify(err);
    });

  return data;
}

function testGetCompany(request, h) {
  console.log("Calling getCompanyInfoTest...");
  const companyId = '193514574648884';
  qboConnector.getCompanyInfoTest(companyId, function(err, data){
    if (err) {
      console.log('Error getting data: '+err);
      return err;
    } else {
      console.log('Data Returned from QBO Connector: ' + JSON.stringify(data));
      return data;
    }
  });
}

console.log("Accounting routes loaded.");