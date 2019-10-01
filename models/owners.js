const fs = require('fs');

const fetchAllOwners = (cb) => {
  const allOwners = [];
  let callCount = 0;
  fs.readdir('./data/owners', (err, fileNames) => {
    fileNames.forEach((fileName, i) => {
      fs.readFile(`./data/owners/${fileName}`, 'utf8', (err, owner) => {
        allOwners[i] = JSON.parse(owner);
        if (++callCount === fileNames.length) cb(null, allOwners);
      });
    });
  });
};

const fetchOwnerById = (id, cb) => {
  fs.readFile(`./data/owners/${id}.json`, 'utf8', (err, owner) => {
    cb(null, JSON.parse(owner));
  });
};

module.exports = {
  fetchAllOwners,
  fetchOwnerById,
};
