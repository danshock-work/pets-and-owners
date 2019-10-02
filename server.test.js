const server = require('./server');
const request = require('supertest');

// this file deals with integration tests

describe('server end-points', () => {
  describe('/api/owners', () => {
    test('GET status:200 responds with an array of owner objects', () => {
      return request(server)
        .get('/api/owners')
        .expect(200)
        .then(({ body }) => {
          expect(body.owners).toEqual([
            {
              id: 'o1',
              name: 'Steve',
              age: 28,
            },
            {
              id: 'o2',
              name: 'Lucy',
              age: 19,
            },
            {
              id: 'o3',
              name: 'Gavin',
              age: 33,
            },
            {
              id: 'o4',
              name: 'Malcolm',
              age: 92,
            },
            {
              id: 'o5',
              name: 'Ronald',
              age: 57,
            },
          ]);
        });
    });
  });
});
