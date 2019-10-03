const { readFile, readdir } = require('fs').promises;

const fetchPetByID = (petID, cb) => {
  return readFile(`./data/pets/${petID}.json`, 'utf-8').then((petsJSON) => {
    return JSON.parse(petsJSON);
  });
};

const fetchPetsByOwnerId = (ownerID) => {};

module.exports = {
  fetchPetByID,
  fetchPetsByOwnerId,
};
