const http = require('http');

const processRequest = require('./process-request');

const server = http.createServer(processRequest);

module.exports = server;
