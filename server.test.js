const server = require('./server');
const request = require('supertest');

// this file deals with integration tests

describe('server end-points', () => {
  describe('/api/owners', () => {
    test('GET status:200 responds with an array of owner objects', (done) => {
      // check the server responds with the correct data ...
    });
  });
});
