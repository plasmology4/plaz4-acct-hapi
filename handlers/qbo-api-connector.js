const axios   = require('axios');

const QBO_BASE_URL = 'https://quickbooks.api.intuit.com' //[key]/[latitude],[longitude]
const QBO_BASE_URL_TEST = 'https://sandbox-quickbooks.api.intuit.com' //[key]/[latitude],[longitude]

// https://sandbox-quickbooks.api.intuit.com/v3/company/193514649568324/account

const test = true;
const key = '90a4fa3aea3e920ca6b30a7a88bae2cf';

const contentHeaders1 = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};

const contentHeaders ={
	'Authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..Ap27rgjDq7Yq1jsmICTFGw.mfa_QSCkAIleMm_-hdUrW_oZdUXtHZNGE1-RKk9EveP6ihJhFdnlAJGH1PbJOu4Q9fR7cSGFHVjTczlTipRjrDowLUPAdj1T5kiGzLLxuvGWGeWSNddeBlLnYgcUdtQER9y5eBFbOXos6goiLNUVUT2jUV1dfSSZVSeGbNBeDzXsclrN7nuDDkaEadV-8z6DVlV3l2LwooOJ0x8PcBr1Sigr5KgWpPN4d-ydKQzkgXWUgT4QtI27Gf_IyY6g3G4jnaM3TcdPK_HBQhYAMNLMXGG4B2kbAO7ln8Oj3DkRpj0Hhp8Pcwd3h_pxKa8B65aoMFy_rL1Jj4DbvU_reX_sYEkfgJKV2p4l6vaJIvHaTkq4e4KTXk6F7-LT7855POWY7BN8g7-i5WGEPrA-XD4xwIqdN9TFFNVawdlvzs3EzbGsqzmRSMHdN69FoyAlcfdzAvcCSP92pNmGng4718n_4jaKMprf1b2gsGoj0sSapNBQ7qAZCwguehk6YUpKb7FjG3cyFB4tFAYrggYuvfmkfjpqiqeEWSVtBtB3vLGwHd-P2jZnBMURNBdIBzYAc7GJLkb8n2g80O1ylvLRsJwi8e4OT92gm-Tf7kThTjNatINipR3OHhtAwXeEuhxY7gA6CRzLtYwRhb5hiMuBsNmeVSFO4rq35lW2IuobX-8PG0kcMAX60fQGZlLXg3PpHygM.Zux_hZbgibaLL2sPgaNAJw',
	'Content-Type': 'application/json',
	'companyId': '193514574648884',
	'Accept': 'application/json'
}




const labels = [];

console.log("Loading QBO routes");


exports.createAccountTypes = function(types, callback) {

}

exports.createAccounts = function(accounts, callback) {

}

exports.getCompanyInfoTest = function(companyId, callback) {

	var baseUrl = (test)? QBO_BASE_URL_TEST: QBO_BASE_URL;
  
  const companyInfoPath = '/v3/company/'+companyId+'/companyinfo/'+companyId;
  const infoUrl = `${baseUrl}` + companyInfoPath;
    
  console.log("headers: "+JSON.stringify(contentHeaders));
	console.log("infoUrl: "+infoUrl);

  var instance = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
    headers: contentHeaders
  });

  console.log(">1");
  var weatherForecast;
  //instance.get(weatherPath)
  axios.get(infoUrl)
    .then((response) => {
      console.log("response: "+response);
      callback(null, resonse)
    })
    //.then((response) => response.json())
    .catch((error) => {
      console.log("Error: "+error);
      callback("Exception getting  data:"+error, null)
    });



}
