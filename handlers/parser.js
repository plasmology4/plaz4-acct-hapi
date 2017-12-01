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
        , fullAcct: data.FULL_ACCT
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

exports.parseJournalEntriesFromFile = function (filename, filter, callback) {
  console.log("parseJournalEntriesFromFile: "+ filename);
  console.log("filter: "+ JSON.stringify(filter));
  var entries = [];
  var err;
 
  csv
    .fromPath(filename, {headers : true})
    .on("data", function(data) {
      //console.log(data);
      var journalEntry = {
        fiscalYr: data.FISCALYR
        , period: data.PERIOD
        , acct: data.ACCT
        , fullAcct: data.FULL_ACCT
        , majorType: data.MAJORTYPE
        , descrip: data.DESCRIP
        , acctDescrip: data.ACCT_DESCRIP
        , periodBalance: data.PERIOD_BALANCE
        , periodDebit: data.PERIOD_DEBIT
        , periodCredit: data.PERIOD_CREDIT
      };
      // Only need the non-zero entries
      if ((journalEntry.periodBalance && journalEntry.periodBalance !== "")
          || (journalEntry.periodDebit && journalEntry.periodDebit !== "")
          || (journalEntry.periodCredit && journalEntry.periodCredit !== ""))
      {
        if (filter) {
          if (filter.year && journalEntry.fiscalYr==filter.year) {
            if (filter.period) {
              if (journalEntry.period === filter.period) {
                entries.push(journalEntry);
              }
            }
            else {
              entries.push(journalEntry);
            }
          }
        }
        else {
          entries.push(journalEntry);
        }
        //console.log("Adding Journal Entry: "+JSON.stringify(journalEntry));    
      }  
    })
    .on("end", function() {
      console.log("done");
      callback(err, entries)
    });
  
}


exports.parseApInvoicesFromFile = function (filename, filterInvoice, callback) {
  console.log("parseApInvoicesFromFile: "+ filename);
  if (filterInvoice) {
    console.log("filtering invoice: " + filterInvoice);
  }
  var items = [];
  var err;
 
  csv
    .fromPath(filename, {headers : true})
    .on("data", function(data) {
      //console.log(data);
      var invoice = {
        vendorNbr: data.VENDORNO
        , vendor: data.COMPANY
        , invoiceNbr: data.INVOICE_NO
        , invoiceId: data.APINVOICE_ID
        , invoiceDate: data.INVOICE_DATE
        , dueDate: data.DUE_DATE
        , amount: data.INVOICE_AMOUNT
        , balanceDue: data.AMOUNT_TO_PAY
        , acct: data.ACCT
        , fullAcct: data.FULL_ACCT
        , acctName: data.DESCRIP
        , majorType: data.MAJORTYPE
        , quantity: data.QTY_INVOICED
        , unitCost: data.UNIT_COST
        , lineAmount: data.AMOUNT_BEFORE_TAX
      };

      console.log(JSON.stringify(invoice));

      if (filterInvoice) {
        if (invoice.invoiceId === filterInvoice) {
          items.push(invoice);
        }
      } else {
        items.push(invoice);
      } 
    })
    .on("end", function() {
      console.log("done");
      callback(err, items)
    });
  
}


