jest.mock('../models/owners.js');
const { getOwners, getOwnerById, postOwner } = require('./owners');
const httpMocks = require('node-mocks-http');
const {
  fetchAllOwners,
  fetchOwnerById,
  createOwner,
} = require('../models/owners.js');

describe('controllers - unit tests', () => {
  describe('getOwners', () => {
    let request, response;
    beforeEach(() => {
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/owners',
      });
      response = httpMocks.createResponse({
        eventEmitter: require('events').EventEmitter,
      });
      response.write = jest.fn();
    });
    test('correct model is invoked by the controller', (done) => {
      response.on('end', () => {
        expect(fetchAllOwners).toHaveBeenCalledTimes(1);
        done();
      });
      getOwners(request, response);
    });
    test('response object has the correct headers set', (done) => {
      response.on('end', () => {
        expect(response.statusCode).toBe(200);
        expect(response._headers).toEqual({
          'content-type': 'application/json',
        });
        done();
      });
      getOwners(request, response);
    });
    test('response object has appropriate data written to the body', (done) => {
      response.on('end', () => {
        const stringifiedBody = JSON.stringify({
          owners: [
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
          ],
        });
        expect(response.write).toBeCalledWith(stringifiedBody);
        done();
      });
      getOwners(request, response);
    });
  });

  describe('getOwnerById', () => {
    let request, response;
    beforeEach(() => {
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/owners/1',
      });
      response = httpMocks.createResponse({
        eventEmitter: require('events').EventEmitter,
      });
      response.write = jest.fn();
    });
    test('correct model is invoked by controller', (done) => {
      response.on('end', () => {
        expect(fetchOwnerById).toHaveBeenCalledTimes(1);
        done();
      });
      getOwnerById(request, response);
    });
    test('response object has correct headers set', (done) => {
      response.on('end', () => {
        expect(response.statusCode).toBe(201);
        expect(response._headers).toEqual({
          'content-type': 'application/json',
        });
        done();
      });
      getOwnerById(request, response);
    });
    test('response body has a single owner object written to the body', (done) => {
      response.on('end', () => {
        expect(response.write).toBeCalledWith(
          JSON.stringify({
            owner: {
              id: 'o1',
              name: 'mitch',
              age: 1000,
            },
          })
        );
        done();
      });
      getOwnerById(request, response);
    });
  });

  describe('postOwner', () => {
    let request, response;
    beforeEach(() => {
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/owners',
        body: {
          name: 'david',
          age: 42,
        },
      });
      response = httpMocks.createResponse({
        eventEmitter: require('events').EventEmitter,
      });
      response.write = jest.fn();
    });
    test('correct model is invoked by the controller', (done) => {
      response.on('end', () => {
        expect(createOwner).toHaveBeenCalledTimes(1);
        done();
      });
      postOwner(request, response);
    });
  });
});
