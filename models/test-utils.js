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

module.exports = { createRandomOwnerData, createRandomPetsData };
