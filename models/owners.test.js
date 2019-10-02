jest.mock('fs');
const { readFile, readdir } = require('fs').promises;
const { sample } = require('lodash');
const { fetchOwnerById, fetchAllOwners } = require('./owners');
const { createRandomOwnerData, fakeReadDir, fakeReadFile } = require('../test-utils');

expect.extend({
  toBeAFunction: (inputReceived) => {
    const pass = typeof inputReceived === 'function';
    if (pass) {
      return {
        message: () => 'expected input is a function',
        pass: true,
      };
    } else {
      return {
        message: () => 'expected input is not a function',
        pass: false,
      };
    }
  },
});

expect.extend({
  toBeAscending: (inputReceived) => {
    if (!Array.isArray(inputReceived)) throw new TypeError('input must be an array in this assertion');
    const pass = inputReceived.every((item, i) => {
      return i < inputReceived.length - 1 ? item <= inputReceived[i + 1] : true;
    });
    if (pass) {
      return {
        message: () => 'this input is in ascending order',
        pass: true,
      };
    } else {
      return {
        message: () => 'input is not in ascending order',
        pass: false,
      };
    }
  },
});

describe('models - unit tests', () => {
  describe('owner models', () => {
    let ownersData;
    beforeEach(() => {
      ownersData = createRandomOwnerData();
      readdir.mockImplementation(fakeReadDir(ownersData));
      readFile.mockImplementation(fakeReadFile(ownersData));
    });
    afterEach(() => jest.clearAllMocks());

    describe('fetchOwnerByID()', () => {
      test('should grab a single owner from the file system', () => {
        const id = sample(Object.keys(ownersData));
        return fetchOwnerById(id).then((owner) => {
          expect(owner).toEqual(ownersData[id]);
        });
      });
    });

    describe('fetchAllOwners()', () => {
      test('should fetch the owners from the file system', () => {
        return fetchAllOwners().then((owners) => {
          owners.forEach((owner) => {
            expect(owners).toContain(owner);
          });
          expect(owners.length).toBe(Object.values(ownersData).length);
        });
      });
      test('should fetch owners from the file system in the correct order', () => {
        return fetchAllOwners().then((owners) => {
          expect(owners).toEqual(Object.values(ownersData));
        });
      });
    });
  });
});
