const { readFile, readdir } = require('fs').promises;

const fetchAllOwners = () => {
  return readdir(`./data/owners/`, 'utf-8').then((owners) => {
    return Promise.all(
      owners.map((owner) => {
        return fetchOwnerById(owner);
      })
    );
  });
};

const fetchOwnerById = (ownerID) => {
  return readFile(`./data/owners/${ownerID}.json`, 'utf-8').then((ownerJSON) => {
    return JSON.parse(ownerJSON);
  });
};

module.exports = {
  fetchAllOwners,
  fetchOwnerById,
};
