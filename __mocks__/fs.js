const faker = require('faker');

const readFile = jest.fn((fileName, encoding, cb) => {
  if (typeof cb !== 'function') throw new TypeError("readFile's callback must be a function");
  if (/\.\/data\/owners\/(o\d*)/.test(fileName)) {
    const [_, id] = fileName.match(/\.\/data\/owners\/(o\d*)/);
    const randomOwner = {
      id,
      name: faker.name.findName(),
      age: Math.ceil(Math.random() * 100),
    };
    cb(null, JSON.stringify(randomOwner));
  } else if (/\.\/data\/pets\/(p\d*)/.test(fileName)) {
    const [_, id] = fileName.match(/\.\/data\/pets\/(p\d*)/);
    const randomPet = {
      id,
      name: faker.name.findName(),
      avatarUrl: faker.internet.url(),
      favouriteFood: faker.random.word(),
      owner: 'o1',
    };
    cb(null, JSON.stringify(randomPet));
  }
});

const readdir = jest.fn((directoryName, cb) => {
  if (typeof cb !== 'function') throw new TypeError(`readdir's cb must be a function`);
  if (directoryName.startsWith('./data/owners')) {
    const randomLength = Math.ceil(Math.random() * 90);
    const ownerFileNames = Array.from({ length: randomLength }, (_, i) => `o${i + 1}`);
    cb(null, ownerFileNames);
  }
});

const writeFile = jest.fn((filePath, data, cb) => {
  if (typeof cb !== 'function') throw new TypeError(`writeFile's cb was not a function`);
  cb(null, 'file has been written');
});

const unlink = jest.fn((filePath, cb) => {});

module.exports = { readFile, readdir, writeFile, unlink };
