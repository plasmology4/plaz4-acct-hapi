var csv = require("fast-csv");


exports.parseAccountTypesFromFile = function (filename, callback) {
  console.log("parseAccountTypesFromFile: "+ filename);
  var types = [];
  var err;
 
  csv
    .fromPath(filename, {headers : true})
    .on("data", function(data) {
      console.log(data);
      var acct = {
        descrip: data.DESCRIP
        , id  : data.ID
        , parentId: data.PARENT_ID  
        , level: data.LEVEL
        , grp: data.GRP
      };
      types.push(acct);
      console.log("Adding Account Type: "+JSON.stringify(acct));

    })
    .on("end", function() {
      console.log("done");
      callback(err, types)

    });

  
}

exports.parseAccountsFromFile = function (filename, callback) {
  console.log("parseAccountsFromFile: "+ filename);
  var accounts = [];
  var err;
 
  csv
    .fromPath(filename, {headers : true})
    .on("data", function(data) {
      console.log(data);
      var acct = {
        acct: data.ACCT
        , acctDesc: data.ACCT_DESCRIP
        , majorType: data.MAJORTYPE
        , subType: data.TYPE_DESCRIP
        , glaId: data.GLA_ID
        , gsaId: data.GSA_ID
        , gsaParentId: data.GSA_PARENT_ID
      };
      accounts.push(acct);
      console.log("Adding Account: "+JSON.stringify(acct));

    })
    .on("end", function() {
      console.log("done");
      callback(err, accounts)

    });
  
}

exports.parseJournalEntriesFromFile = function (filename, callback) {
  console.log("parseJournalEntriesFromFile: "+ filename);
  var entries = [];
  var err;
 
  csv
    .fromPath(filename, {headers : true})
    .on("data", function(data) {
      console.log(data);
      var journalEntry = {
        fiscalYr: data.FISCALYR
        , period: data.PERIOD
        , acct: data.ACCT
        , descrip: data.DESCRIP
        , acctDescrip: data.ACCT_DESCRIP
        , periodBalance: data.PERIOD_BALANCE
      };
      // Only need the non-zero entries
      if (journalEntry.periodBalance && journalEntry.periodBalance !== "")
      {
        entries.push(journalEntry);
        console.log("Adding Journal Entry: "+JSON.stringify(journalEntry));    
      }  
    })
    .on("end", function() {
      console.log("done");
      callback(err, entries)
    });
  
}





