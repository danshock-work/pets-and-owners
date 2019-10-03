jest.mock('../models/pets.js');
const { getPetByID, getPetsByOwnerID } = require('./pets');
const { sample } = require('lodash');
const { fetchPetByID, fetchPetsByOwnerID } = require('../models/pets');
const { createRandomPetsData, createRandomOwnerData } = require('../test-utils.js');
const httpMocks = require('node-mocks-http');

describe('controllers - unit tests', () => {
  let request, response;
  let fakePetData, fakePets, fakeOwnerData;
  describe('getPetsByOwnerID()', () => {
    beforeEach(() => {
      fakeOwnerData = createRandomOwnerData();
      fakeOwnerID = sample(Object.keys(fakeOwnerData));
      fakePetData = createRandomPetsData(Object.keys(fakeOwnerData));
      fakePets = Object.values(fakePetData);
      fetchPetsByOwnerID.mockImplementation((ownerID) => {
        return Promise.resolve(fakePets.filter(({ owner }) => owner === ownerID));
      });
      request = httpMocks.createRequest({
        method: 'GET',
        url: `/api/owners/${fakeOwnerID}/pets`,
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
      getPetsByOwnerID(request, response);
    });
    test('all owners from model are written on to the response body', (done) => {
      response.on('end', () => {
        expect(response.write).toHaveBeenCalledWith(
          JSON.stringify({ pets: fakePets.filter((pet) => pet.owner === fakeOwnerID) })
        );
        done();
      });
      getPetsByOwnerID(request, response);
    });
  });

  describe('getPetByID()', () => {
    let fakePetID;
    beforeEach(() => {
      fakeOwnerData = createRandomOwnerData();
      fakePetData = createRandomPetsData(Object.keys(fakeOwnerData));
      fakePets = Object.values(fakePetData);
      fakePetID = sample(Object.keys(fakePetData));
      fetchPetByID.mockImplementationOnce((petID) =>
        fakePetData[petID]
          ? Promise.resolve(fakePetData[petID])
          : Promise.reject({ message: 'This pet cannot be found' })
      );
      request = httpMocks.createRequest({
        method: 'GET',
        url: `/api/pets/${fakePetID}`,
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
      getPetByID(request, response);
    });
    test('specific pet from model is written to the response model', (done) => {
      response.on('end', () => {
        expect(response.write).toHaveBeenCalledWith(JSON.stringify({ pet: fakePetData[fakePetID] }));
        done();
      });
      getPetByID(request, response);
    });
  });
});
