module.exports = {
  "host": "127.0.0.1",
  "port": 27017,
  //"db": "bogus",
  "db": "plaz4-accounting-mongo",
  "username": "",
  "password": "",
  "options": { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
               replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }
};

// var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
//                 replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }};  

//module.exports = options;