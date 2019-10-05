const server = require('./server');
const request = require('supertest');
const { fetchPetsByOwnerID } = require('../models/pets');

describe('integration: server end-points', () => {
  describe('/api/owners', () => {
    test('GET status:200 responds with an array of owner objects', () => {
      return request(server)
        .get('/api/owners')
        .expect(200)
        .then((res) => {
          expect(res.body.owners).toBeInstanceOf(Array);
        });
    });
  });

  describe('/api/owners/:owner_id', () => {
    test('Get owner with specified id', () => {
      let id = 'o1';
      return request(server)
        .get(`/api/owners/${id}`)
        .expect(200)
        .then((res) => {
          expect(res.body.owner).toEqual({
            id: 'o1',
            name: 'Steve',
            age: 28,
          });
        });
    });
  });

  describe('/api/pets/:pet_id', () => {
    test('Get pet with specified id', () => {
      let id = 'p1';
      return request(server)
        .get(`/api/pets/${id}`)
        .expect(200)
        .then((res) => {
          expect(res.body.pet).toEqual({
            id: 'p1',
            name: 'Alan Turin',
            avatarUrl:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjOqKI0kZG7nIV2w7AFRWfPUGiqeM0J26TbCp8irR1jZiNG556',
            favouriteFood: 'Digestive Biscuits',
            owner: 'o1',
          });
        });
    });
  });

  describe('/api/owners/:owner_id/pets', () => {
    test('should return pets of specific owner', () => {
      let id = 'o3';
      return request(server)
        .get(`/api/owners/${id}/pets`)
        .expect(200)
        .then((res) => {
          fetchPetsByOwnerID(id).then((expected) => {
            expect(res.body.pets).toEqual(expected);
          });
        });
    });
  });
});
