'use strict';
const acctRoutes = require('./routes/acct');


// Set up MongoDB connection 
// var mongoConfig = require('./mongo.config.js');
// var mongoose = require('mongoose');

exports.register = function(server, options, next) {
  console.log("plaz4-acct-hapi Options: " + JSON.stringify(options));

  server.route(acctRoutes(options));
  
  server.route({
    method: 'GET',
    path: '/status',
    handler: function(request, reply) {
      var rtnObj = { name: 'Plaz4 API', 
                     url: 'http://localhost:3030/acct', 
                     version: '1.0', 
                     status: 'OK' };
      reply(rtnObj);
    }
  });

  console.log("plaz4-acct-hapi Routes Registered");

  next();

};

exports.register.attributes = {
  pkg: require('./package.json')
};