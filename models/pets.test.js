jest.mock('fs');
const { readFile, readdir } = require('fs');
const { sample } = require('lodash');
const { fetchPetByID, fetchPetsByOwnerId } = require('./pets');
const { createRandomPetsData, createRandomOwnerData, mockReadDir, mockReadFile } = require('./test-utils');

expect.extend({
  toBeAFunction: (inputReceived) => {
    const pass = typeof inputReceived === 'function';
    if (pass) {
      return {
        message: () => {
          return 'expected input is a function';
        },
        pass: true,
      };
    } else {
      return {
        message: () => {
          return 'expected input is not a function';
        },
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
        message: () => {
          return 'this input is in ascending order';
        },
        pass: true,
      };
    } else {
      return {
        message: () => {
          return 'input is not in ascending order';
        },
        pass: false,
      };
    }
  },
});

describe('models - unit tests', () => {
  describe('pets models - unit tests', () => {
    let ownersData;
    let petsData;
    beforeEach(() => {
      ownersData = createRandomOwnerData();
      petsData = createRandomPetsData(Object.keys(ownersData));
      readdir.mockImplementation(mockReadDir(ownersData, petsData));
      readFile.mockImplementation(mockReadFile(ownersData, petsData));
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('fetchPetByID()', () => {
      test('should fetch a single owner from the file system', (done) => {
        const id = sample(Object.keys(petsData));
        fetchPetByID(id, (err, pet) => {
          expect(pet).toEqual(petsData[id]);
          done();
        });
      });
    });

    describe('fetchPetsByOwnerId()', () => {
      test('fetch all the pets with a particular owner id', (done) => {
        const randomOwnerID = sample(Object.keys(ownersData));
        fetchPetsByOwnerId(randomOwnerID, (err, pets) => {
          const allHaveOwnerID = pets.every(({ owner }) => owner === randomOwnerID);
          expect(allHaveOwnerID).toBe(true);
          done();
        });
      });
      test('fetch all the pets with a particular owner id (in ascending order)', (done) => {
        const randomOwnerID = sample(Object.keys(ownersData));
        fetchPetsByOwnerId(randomOwnerID, (err, pets) => {
          expect(pets).toEqual(Object.values(petsData).filter(({ owner }) => owner === randomOwnerID));
          done();
        });
      });
    });
  });
});
