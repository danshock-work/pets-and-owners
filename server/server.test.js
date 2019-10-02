const server = require('./server');
const request = require('supertest');

// this file deals with integration tests

describe('integration: server end-points', () => {
  describe('/api/owners', () => {
    test('GET status:200 responds with an array of owner objects', () => {});
  });
});
