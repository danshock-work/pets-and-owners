const { readFile, readdir } = require('fs').promises;

const fetchAllOwners = () => {};

const fetchOwnerById = (ownerID) => {
  return readFile(`./data/owners/${ownerID}.json`, 'utf-8').then((ownerJSON) => {
    return JSON.parse(ownerJSON);
  });
};

module.exports = {
  fetchAllOwners,
  fetchOwnerById,
};
