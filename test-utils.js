const faker = require('faker');
const { sample } = require('lodash');

const createRandomOwner = (id) => {
  return {
    id,
    name: faker.name.findName(),
    age: Math.ceil(Math.random() * 100),
  };
};

const createRandomPet = (id, ownerIDs) => {
  return {
    id,
    name: faker.name.findName(),
    avatarUrl: faker.internet.url(),
    favouriteFood: faker.random.word(),
    owner: sample(ownerIDs),
  };
};

const createRandomOwnerData = () => {
  const randomLength = Math.ceil(Math.random() * 20);
  const ownerFileNames = Array.from({ length: randomLength }, (_, i) => `o${i + 1}`);
  const ownerData = {};
  ownerFileNames.forEach((ownerID) => (ownerData[ownerID] = createRandomOwner(ownerID)));
  return ownerData;
};

const createRandomPetsData = (ownerIDs) => {
  const randomLength = Math.ceil(Math.random() * 40);
  const petFileNames = Array.from({ length: randomLength }, (_, i) => `p${i + 1}`);
  const petData = {};
  petFileNames.forEach((petID) => (petData[petID] = createRandomPet(petID, ownerIDs)));
  return petData;
};

const fakeReadDir = (ownersData, petsData) => (directory, cb) => {
  return new Promise((resolve, reject) => {
    if (directory.includes('./data/owners')) resolve(Object.keys(ownersData).map((id) => `${id}.json`));
    else if (directory.includes('./data/pets')) resolve(Object.keys(petsData).map((id) => `${id}.json`));
    else reject(new Error(`ENOENT: no such file or directory, open ${directory}`));
  });
};

const fakeReadFile = (ownersData, petsData) => (fileName, encoding, cb) => {
  let ownerID, petID;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (/\.\/data\/owners\/(o\d*)/.test(fileName)) {
        [_, ownerID] = fileName.match(/\.\/data\/owners\/(o\d*)/);
        const stringifiedOwner = JSON.stringify(ownersData[ownerID]);
        if (Object.keys(ownersData).includes(ownerID)) resolve(stringifiedOwner);
      } else if (/\.\/data\/pets\/(p\d*)/.test(fileName)) {
        [_, petID] = fileName.match(/\.\/data\/pets\/(p\d*)/);
        const stringifiedPet = JSON.stringify(petsData[petID]);
        if (Object.keys(petsData).includes(petID)) resolve(stringifiedPet);
      } else reject(new Error(`ERROR: ${fileName} does not contain any data`));
    }, Math.random() * 40);
  });
};

module.exports = {
  createRandomOwnerData,
  createRandomPetsData,
  fakeReadDir,
  fakeReadFile,
  createRandomOwner,
  createRandomPet,
};
