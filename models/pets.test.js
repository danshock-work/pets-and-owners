jest.mock('fs');
const { readFile, readdir } = require('fs').promises;
const { sample } = require('lodash');
const { fetchPetByID, fetchPetsByOwnerId } = require('./pets');
const { createRandomPetsData, createRandomOwnerData, fakeReadDir, fakeReadFile } = require('../test-utils');

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
      readdir.mockImplementation(fakeReadDir(ownersData, petsData));
      readFile.mockImplementation(fakeReadFile(ownersData, petsData));
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('fetchPetByID()', () => {
      test('should fetch a single owner from the file system', () => {
        const id = sample(Object.keys(petsData));
        return fetchPetByID(id).then((pet) => {
          expect(pet).toEqual(petsData[id]);
        });
      });
    });

    describe('fetchPetsByOwnerId()', () => {
      test('fetch all the pets with a particular owner id', () => {
        const randomOwnerID = sample(Object.keys(ownersData));
        return fetchPetsByOwnerId(randomOwnerID).then((pets) => {
          const allHaveOwnerID = pets.every(({ owner }) => owner === randomOwnerID);
          expect(allHaveOwnerID).toBe(true);
        });
      });
      test('fetch all the pets with a particular owner id (in ascending order)', () => {
        const randomOwnerID = sample(Object.keys(ownersData));
        return fetchPetsByOwnerId(randomOwnerID).then((pets) => {
          expect(pets).toEqual(Object.values(petsData).filter(({ owner }) => owner === randomOwnerID));
        });
      });
    });
  });
});
