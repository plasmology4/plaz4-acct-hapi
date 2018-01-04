'use strict';
const acctRoutes = require('./routes/acct');

// Set up MongoDB connection 
// var mongoConfig = require('./mongo.config.js');
// var mongoose = require('mongoose');

exports.plugin = {
  name: 'plaz4-acct-hapi',
  register: function (server, options) {

    console.log("plaz4-acct-hapi Options: " + JSON.stringify(options));

    server.route(acctRoutes(options));
    
    server.route({
      method: 'GET',
      path: '/',
      handler: function(request, h) {
        var rtnObj = { name: 'Plaz4 API - Accounting', 
                       url: 'http://localhost:3030/acct', 
                       version: '1.0', 
                       status: 'OK' };
        return h.response(rtnObj);
      }
    });

    server.route({
      method: 'GET',
      path: '/status',
      handler: function(request, h) {
        var rtnObj = { name: 'Plaz4 API', 
                       url: 'http://localhost:3030/acct', 
                       version: '1.0', 
                       status: 'OK' };
        return h.response(rtnObj);
      }
    });

    console.log("plaz4-acct-hapi Routes Registered");
  }
};