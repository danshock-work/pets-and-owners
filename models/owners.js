const fs = require('fs');

const createOwner = (data, cb) => {
  
};

const fetchAllOwners = (cb) => {
  const allOwners = [];
  let callCount = 0;
  fs.readdir('./data/owners', (err, fileNames) => {
    fileNames.forEach((fileName, i) => {
      fs.readFile(`./data/owners/${fileName}`, 'utf8', (err, owner) => {
        allOwners[i] = owner;
        if (++callCount === fileNames.length) cb(null, allOwners);
      });
    });
  });
};

const fetchOwnerById = (id, cb) => {
  fs.readFile(`./data/owners/${id}.json`, 'utf8', (err, owner) => {
    cb(null, owner);
  });
};

const updateOwner = (id, data, cb) => {};

const deleteOwnerById = (id, cb) => {};

module.exports = {
  createOwner,
  fetchAllOwners,
  fetchOwnerById,
  updateOwner,
  deleteOwnerById,
};
