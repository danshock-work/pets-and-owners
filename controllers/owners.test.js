jest.mock('../models/owners.js');
const { getOwners, getOwnerById } = require('./owners');
const httpMocks = require('node-mocks-http');
const { fetchAllOwners, fetchOwnerById } = require('../models/owners.js');

describe('controllers - unit tests', () => {
  describe('getOwners', () => {});

  describe('getOwnerById', () => {});
});
