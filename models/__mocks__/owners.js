const { createRandomOwner, createRandomPet, createRandomOwnerData, createRandomPetsData } = require('../test-utils');

const fetchAllOwners = jest.fn((cb) => {});

const fetchOwnerById = jest.fn((id, cb) => {});

module.exports = { fetchAllOwners, fetchOwnerById};
