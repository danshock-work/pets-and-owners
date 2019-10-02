const { readFile, readdir } = require('fs').promises;

const fetchAllOwners = () => {
  return readdir('./data/owners', 'utf8').then((ownerFiles) => {
    const promisedOwners = ownerFiles.map((ownerFile) => {
      return readFile(`./data/owners/${ownerFile}`, 'utf8');
    });
    return Promise.all(promisedOwners).then((owners) => owners.map((owner) => JSON.parse(owner)));
  });
};

const fetchOwnerById = (ownerID) => {
  return readFile(`./data/owners/${ownerID}.json`, 'utf8').then((owner) => JSON.parse(owner));
};

module.exports = {
  fetchAllOwners,
  fetchOwnerById,
};
