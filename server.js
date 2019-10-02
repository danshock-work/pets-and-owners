const http = require('http');
const { getOwners } = require('./controllers/owners');

const server = http.createServer((request, response) => {
  getOwners(request, response);
});

module.exports = server;
