jest.mock('../models/owners.js');
const { getOwners, getOwnerByID } = require('./owners');
const { sample } = require('lodash');
const { fetchAllOwners, fetchOwnerById } = require('../models/owners');
const { createRandomOwnerData } = require('../test-utils.js');
const httpMocks = require('node-mocks-http');

describe('controllers - unit tests', () => {
  let request, response;
  let fakeOwnerData, fakeOwners;
  describe.only('getOwners()', () => {
    beforeEach(() => {
      fakeOwnerData = createRandomOwnerData();
      fakeOwners = Object.values(fakeOwnerData);
      fetchAllOwners.mockResolvedValue(fakeOwners);
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/owners',
      });
      response = httpMocks.createResponse({
        eventEmitter: require('events').EventEmitter,
      });
      response.write = jest.fn();
    });
    test('Content-Type header is set to application/json', (done) => {
      response.on('end', () => {
        expect(response._headers).toEqual({
          'content-type': 'application/json',
        });
        done();
      });
      getOwners(request, response);
    });
    test('all owners from model are written on to the response body', (done) => {
      response.on('end', () => {
        expect(response.write).toHaveBeenCalledWith(JSON.stringify({ owners: fakeOwners }));
        done();
      });
      getOwners(request, response);
    });
  });

  describe.only('getOwnerByID()', () => {
    let fakeOwnerID;
    beforeEach(() => {
      fakeOwnerID = sample(Object.keys(fakeOwnerData));
      fetchOwnerById.mockImplementationOnce((ownerID) =>
        fakeOwnerData[ownerID]
          ? Promise.resolve(fakeOwnerData[ownerID])
          : Promise.reject({ message: 'This owner cannot be found' })
      );
      request = httpMocks.createRequest({
        method: 'GET',
        url: `/api/owners/${fakeOwnerID}`,
      });
      response = httpMocks.createResponse({
        eventEmitter: require('events').EventEmitter,
      });
      response.write = jest.fn();
    });
    test('Content-Type header is set to application/json', (done) => {
      response.on('end', () => {
        expect(response._headers).toEqual({
          'content-type': 'application/json',
        });
        done();
      });
      getOwnerByID(request, response);
    });
    test('specific owner from model is written to the response model', (done) => {
      response.on('end', () => {
        expect(response.write).toHaveBeenCalledWith(JSON.stringify({ owner: fakeOwnerData[fakeOwnerID] }));
        done();
      });
      getOwnerByID(request, response);
    });
  });
});
