const { readFile, readdir } = require('fs');

const fetchAllOwners = () => {
  const allOwners = [];
  let ownerResponses = 0;
  readdir('./data/owners', (err, ownerFiles) => {
    ownerFiles.forEach((ownerFile, i) => {
      readFile(`./data/owners/${ownerFile}`, 'utf8', (err, ownerJSON) => {
        ownerResponses++;
        allOwners[i] = JSON.parse(ownerJSON);
        if (ownerResponses === ownerFiles.length) {
          cb(null, allOwners);
        }
      });
    });
  });
};

const fetchOwnerById = (ownerID, cb) => {
  readFile(`./data/owners/${ownerID}.json`, 'utf8', (error, owner) => {
    cb(null, JSON.parse(owner));
  });
};

module.exports = {
  fetchAllOwners,
  fetchOwnerById,
};
