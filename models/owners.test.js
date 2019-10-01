jest.mock('fs');
const { readFile, readdir } = require('fs');
const { sample } = require('lodash');
const { fetchOwnerById, fetchAllOwners } = require('./owners');
const { createRandomOwnerData, mockReadDir, mockReadFile } = require('./test-utils');

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
      readdir.mockImplementation(mockReadDir(ownersData));
      readFile.mockImplementation(mockReadFile(ownersData));
    });
    afterEach(() => jest.clearAllMocks());

    describe('fetchOwnerByID()', () => {
      test('should grab a single owner from the file system', (done) => {
        const id = sample(Object.keys(ownersData));
        fetchOwnerById(id, (err, owner) => {
          expect(owner).toEqual(ownersData[id]);
          done();
        });
      });
    });

    describe('fetchAllOwners()', () => {
      test('should fetch the owners from the file system', (done) => {
        fetchAllOwners((err, owners) => {
          owners.forEach((owner) => {
            expect(owners).toContain(owner);
          });
          expect(owners.length).toBe(Object.values(ownersData).length);
          done();
        });
      });
      test('should fetch owners from the file system in the correct order', (done) => {
        fetchAllOwners((err, owners) => {
          expect(owners).toEqual(Object.values(ownersData));
          done();
        });
      });
    });
  });
});
