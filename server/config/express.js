//var finalhandler = require('finalhandler');
//var http = require('http');
//var responseTime = require('response-time');

var morgan = require('morgan');

module.exports.express = {
    customMiddleware: function(app) {
      app.use(morgan('dev'))
    }
}