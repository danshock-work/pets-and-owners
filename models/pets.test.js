jest.mock('fs');
const { readFile, readdir, writeFile, unlink } = require('fs');
const faker = require('faker');
const { sample } = require('lodash');
const { createPet, fetchPetById, fetchPetsByOwnerId, deletePetById } = require('./pets');

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

describe('pets models - unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPetById', () => {
    test('readFile is invoked with the filePath, encoding and a callback function', (done) => {
      fetchPetById(1, (err, owners) => {});
      const firstCallArgs = readFile.mock.calls[0];
      expect(firstCallArgs[0]).toBe('./data/pets/p1.json');
      expect(firstCallArgs[1]).toBe('utf8');
      expect(firstCallArgs[2]).toBeAFunction();
      done();
    });

    test('callback is invoked with the owner object (for valid id)', (done) => {
      fetchPetById(1, (err, pet) => {
        expect(err).toBeNull();
        expect(pet).toHaveProperty('id');
        expect(pet).toHaveProperty('name');
        expect(pet).toHaveProperty('avatarUrl');
        expect(pet).toHaveProperty('favouriteFood');
        expect(pet.id).toEqual('p1');
        done();
      });
    });
  });

  describe('deletePetById()', () => {
    test('model invokes unlink method from fs', (done) => {
      deletePetById(1, () => {});
      expect(unlink).toHaveBeenCalledTimes(1);
      done();
    });

    test('unlink is invoked with the correct file path and a callback', (done) => {
      const randomID = Math.ceil(Math.random() * 20);
      deletePetById(randomID, () => {});
      expect(unlink.mock.calls[0][0]).toBe(`./data/pets/p${randomID}`);
      expect(unlink.mock.calls[0][1]).toBeAFunction();
      done();
    });

    test('callback is invoked with a message saying item was deleted when unlink is not invoked with error', (done) => {
      const randomID = Math.ceil(Math.random() * 20);
      unlink.mockImplementationOnce((filePath, cb) => cb(null));
      deletePetById(randomID, (err, response) => {
        expect(response).toBe(`p${randomID} was successfully deleted...`);
        done();
      });
    });
  });

  describe('createPet()', () => {
    test('readdir is invoked by the model', (done) => {
      const data = {
        name: 'sam',
        age: 31,
      };
      createPet(1, data, function() {});
      const readdirFirstArgs = readdir.mock.calls[0];
      expect(readdirFirstArgs[0]).toBe('./data/pets');
      expect(readdirFirstArgs[1]).toBeAFunction();
      done();
    });

    test('writeFile is invoked with the correct file path and data in the correct form', (done) => {
      const ownersDirectory = ['o1', 'o2', 'o3', 'o4', 'o5'];
      const petsDirectory = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13'];
      const randomOwnerID = sample(ownersDirectory);
      const randomPet = {
        name: faker.name.findName(),
        avatarUrl: faker.internet.url(),
        favouriteFood: faker.random.word(),
      };
      readdir.mockImplementationOnce((directoryName, cb) => {
        if (directoryName.startsWith('./data/owners')) cb(null, ownerDirectory);
        else if (directoryName.startsWith('./data/pets')) cb(null, petsDirectory);
      });
      createPet(+randomOwnerID.slice(1), randomPet, function() {
        const writeFileArgs = writeFile.mock.calls[0];
        expect(writeFileArgs[0]).toBe(`./data/pets/p14.json`);
        expect(JSON.parse(writeFileArgs[1])).toEqual({ ...randomPet, id: 'p14', owner: randomOwnerID });
        expect(writeFileArgs[2]).toBeAFunction();
        done();
      });
    });
    // test("callack is invoked with error if the given owner id doesn't exist", () => {});
    // test('callback is invoked with the the newly added pet', (done) => {
    //   const data = {
    //     name: 'sam',
    //     age: 31,
    //   };
    //   readdir.mockImplementationOnce((directory, cb) => cb(null, ['o1', 'o3', 'o4']));
    //   createOwner(data, function(err, owner) {
    //     expect(err).toBeNull();
    //     expect(owner).toEqual({
    //       ...data,
    //       id: 'o5',
    //     });
    //     done();
    //   });
    // });
  });

  describe('fetchPetsByOwnerId()', () => {
    test('readdir is invoked ', () => {
      
    });
  });
});
