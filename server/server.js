// const http = require('http');

// const processRequest = require('./process-request');

// const server = http.createServer(processRequest);

// module.exports = server;

const express = require('express');
const app = express();
const { getOwners, getOwnerByID } = require('../controllers/owners');
const { getPetByID, getPetsByOwnerID } = require('../controllers/pets');

app.get('/', (req, res) => res.send('Welcome...'));
app.get('/api/owners', getOwners);
app.get('/api/owners/:ownerID', getOwnerByID);
app.get('/api/pets/:petID', getPetByID);
app.get('/api/owners/:ownerID/pets', getPetsByOwnerID);
module.exports = app;
