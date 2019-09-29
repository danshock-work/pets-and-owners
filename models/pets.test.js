jest.mock('fs');
const { readFile, readdir, writeFile, unlink } = require('fs');
const { sample } = require('lodash');
const { createPet, fetchPetById, fetchPetsByOwnerId, deletePetById } = require('./pets');
const { createRandomPetsData, createRandomOwnerData } = require('./test-utils');

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
      readdir.mockImplementation((directory, cb) => {
        if (directory.includes('./data/owners')) cb(null, Object.keys(ownersData).map((id) => `${id}.json`));
        else if (directory.includes('./data/pets')) cb(null, Object.keys(petsData).map((id) => `${id}.json`));
        else cb(new Error(`ENOENT: no such file or directory, open ${directory}`));
      });
      readFile.mockImplementation((fileName, encoding, cb) => {
        let ownerID, petID;
        setTimeout(() => {
          if (/\.\/data\/owners\/(o\d*)/.test(fileName)) {
            [_, petID] = fileName.match(/\.\/data\/owners\/(o\d*)/);
            const stringifiedOwner = JSON.stringify(ownersData[ownerID]);
            if (Object.keys(ownersData).includes(ownerID)) cb(null, stringifiedOwner);
          } else if (/\.\/data\/pets\/(p\d*)/.test(fileName)) {
            [_, petID] = fileName.match(/\.\/data\/pets\/(p\d*)/);
            const stringifiedPet = JSON.stringify(petsData[petID]);
            if (Object.keys(petsData).includes(petID)) cb(null, stringifiedPet);
          } else cb(new Error(`ENOENT: no such file or directory, open ${fileName}`));
        }, Math.random() * 500);
      });
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('fetchPetsByOwnerId()', () => {
      test('fetch all the pets with a particular owner id', (done) => {
        const randomOwnerID = sample(Object.keys(ownersData));
        fetchPetsByOwnerId(randomOwnerID, (err, pets) => {
          const allHaveOwnerID = pets.every(({ owner }) => {
            return owner === randomOwnerID;
          });
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
