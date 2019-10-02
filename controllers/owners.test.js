jest.mock('../models/owners.js');
const { getOwners } = require('./owners');
const { fetchAllOwners, fetchOwnerById } = require('../models/owners.js');

describe.only('controllers - unit tests', () => {
  describe('getOwners', () => {
    describe('headers', () => {
      test('statusCode is set to 200 on the response object', () => {});
    });
  });

  describe('getOwnerById', () => {});
});
