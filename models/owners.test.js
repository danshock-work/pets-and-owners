jest.mock('fs');
const { readFile, readdir, writeFile, unlink } = require('fs');
const faker = require('faker');
const { fetchOwnerById, fetchAllOwners, createOwner, deleteOwnerById, updateOwner } = require('./owners');

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
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPetById', () => {
    test('readFile is invoked with the filePath, encoding and a callback function', (done) => {
      fetchOwnerById(1, (err, owners) => {});
      const readFileArgs = readFile.mock.calls[0];
      expect(readFileArgs[0]).toBe('./data/owners/o1.json');
      expect(readFileArgs[1]).toBe('utf8');
      expect(readFileArgs[2]).toBeAFunction();
      done();
    });

    test('callback is invoked with the owner object (for valid id)', (done) => {
      fetchOwnerById(1, (err, owner) => {
        expect(err).toBeNull();
        expect(owner).toHaveProperty('id');
        expect(owner).toHaveProperty('name');
        expect(owner).toHaveProperty('age');
        expect(owner.id).toEqual('o1');
        done();
      });
    });
  });

  describe('fetchAllOwners', () => {
    test('readdir is invoked with the directory name and a callback', (done) => {
      fetchAllOwners(function() {});
      const readdirFirstArgs = readdir.mock.calls[0];
      expect(readdirFirstArgs[0]).toBe('./data/owners');
      expect(readdirFirstArgs[1]).toBeAFunction();
      done();
    });

    test('readFile is invoked with the number of files in the owners directory', (done) => {
      const randomLength = Math.ceil(Math.random() * 90);
      const ownerFileNames = Array.from({ length: randomLength }, (_, i) => `o${i + 1}.json`);
      readdir.mockImplementationOnce((directory, cb) => cb(null, ownerFileNames));
      fetchAllOwners(() => {
        expect(readFile).toHaveBeenCalledTimes(randomLength);
        done();
      });
    });

    test('readFile is invoked with the correct filePath and encoding', (done) => {
      const randomLength = Math.ceil(Math.random() * 90);
      const ownerFileNames = Array.from({ length: randomLength }, (_, i) => `o${i + 1}.json`);
      readdir.mockImplementationOnce((directory, cb) => cb(null, ownerFileNames));
      fetchAllOwners(() => {
        ownerFileNames.forEach((fileName, i) => {
          expect(readFile.mock.calls[i][0]).toBe(`./data/owners/${fileName}`);
          expect(readFile.mock.calls[i][1]).toBe(`utf8`);
        });
        done();
      });
    });

    test('callback is invoked with correct number of owner files', (done) => {
      const randomLength = Math.ceil(Math.random() * 90);
      const ownerFileNames = Array.from({ length: randomLength }, (_, i) => `o${i + 1}`);
      readdir.mockImplementationOnce((directory, cb) => cb(null, ownerFileNames));
      fetchAllOwners((err, owners) => {
        expect(owners.length).toBe(randomLength);
        done();
      });
    });

    test('callback is invoked with an array of owner objects (in correct order)', (done) => {
      const randomLength = Math.ceil(Math.random() * 90);
      const ownerFileNames = Array.from({ length: randomLength }, (_, i) => `o${i + 1}`);
      readdir.mockImplementationOnce((directory, cb) => cb(null, ownerFileNames));
      fetchAllOwners((err, owners) => {
        expect(owners.map((owner) => +owner.id.match(/o(\d*)/)[1])).toBeAscending();
        done();
      });
    });
  });

  describe('createOwner()', () => {
    test('readdir is invoked by the model', (done) => {
      const data = {
        name: 'sam',
        age: 31,
      };
      createOwner(data, function() {});
      const readdirFirstArgs = readdir.mock.calls[0];
      expect(readdirFirstArgs[0]).toBe('./data/owners');
      expect(readdirFirstArgs[1]).toBeAFunction();
      done();
    });

    test('writeFile is invoked with the correct file path and data in the correct form', (done) => {
      const data = {
        name: 'sam',
        age: 31,
      };
      readdir.mockImplementationOnce((directory, cb) => cb(null, ['o1', 'o3', 'o4']));
      createOwner(data, function() {
        const writeFileArgs = writeFile.mock.calls[0];
        expect(writeFileArgs[0]).toBe(`./data/owners/o5.json`);
        expect(writeFileArgs[1]).toEqual({
          ...data,
          id: 'o5',
        });
        expect(writeFileArgs[2]).toBeAFunction();
        done();
      });
    });

    test('callback is invoked with the the newly added owner', (done) => {
      const data = {
        name: 'sam',
        age: 31,
      };
      readdir.mockImplementationOnce((directory, cb) => cb(null, ['o1', 'o3', 'o4']));
      createOwner(data, function(err, owner) {
        expect(err).toBeNull();
        expect(owner).toEqual({
          ...data,
          id: 'o5',
        });
        done();
      });
    });
  });

  describe('deleteOwnerById()', () => {
    test('model invokes unlink method from fs', (done) => {
      deleteOwnerById(1, () => {});
      expect(unlink).toHaveBeenCalledTimes(1);
      done();
    });

    test('unlink is invoked with the correct file path and a callback', (done) => {
      const randomID = Math.ceil(Math.random() * 20);
      deleteOwnerById(randomID, () => {});
      expect(unlink.mock.calls[0][0]).toBe(`./data/owners/o${randomID}`);
      expect(unlink.mock.calls[0][1]).toBeAFunction();
      done();
    });

    test('callback is invoked with a message saying item was deleted when unlink is not invoked with error', (done) => {
      const randomID = Math.ceil(Math.random() * 20);
      unlink.mockImplementationOnce((filePath, cb) => cb(null));
      deleteOwnerById(randomID, (err, response) => {
        expect(response).toBe(`o${randomID} was successfully deleted...`);
        done();
      });
    });
  });

  describe('updateOwner()', () => {
    test('readFile must be invoked by the model', (done) => {
      const randomID = Math.ceil(Math.random() * 20);
      updateOwner(randomID, {}, () => {});
      expect(readFile).toHaveBeenCalledTimes(1);
      done();
    });

    test('readFile must be invoked with the correct filePath, data and a function', (done) => {
      const randomID = Math.ceil(Math.random() * 20);
      updateOwner(randomID, {}, () => {});
      expect(readFile.mock.calls[0][0]).toBe(`./data/owners/o${randomID}.json`);
      expect(readFile.mock.calls[0][1]).toBe('utf8');
      expect(readFile.mock.calls[0][2]).toBeAFunction();
      done();
    });

    test('writeFile is invoked with patched owner when readFile responds with owner data', (done) => {
      const randomID = Math.ceil(Math.random() * 20);
      const name = faker.name.findName();
      const age = 100;
      readFile.mockImplementationOnce((fileName, encoding, cb) => {
        cb(
          null,
          JSON.stringify({
            id: randomID,
            name,
            age,
          })
        );
      });
      const data = { age: 42 };
      updateOwner(randomID, data, () => {
        expect(writeFile.mock.calls[0][0]).toBe(`./data/owners/o${randomID}.json`);
        expect(JSON.parse(writeFile.mock.calls[0][1])).toEqual({
          name,
          id: randomID,
          age: 42,
        });
        expect(writeFile.mock.calls[0][2]).toBeAFunction();
        done();
      });
    });

    test('callback passed to updateOwner is invoked with newly patched owner', (done) => {
      const randomID = Math.ceil(Math.random() * 20);
      const name = faker.name.findName();
      const age = 100;
      readFile.mockImplementationOnce((fileName, encoding, cb) => {
        cb(
          null,
          JSON.stringify({
            id: randomID,
            name,
            age,
          })
        );
      });
      const data = { age: 42 };
      updateOwner(randomID, data, (err, owner) => {
        expect(owner).toEqual({ id: randomID, age, name, ...data });
        done();
      });
    });
  });
});
