const fs = require('fs');

const createOwner = (data, cb) => {
  fs.readdir('./data/owners', (err, ownerFiles) => {
    const maxID = Math.max(...ownerFiles.map((ownerFile) => +ownerFile.match(/o(\d*)/)[1]));
    const newOwner = { ...data, id: `o${maxID + 1}` };
    fs.writeFile(`./data/owners/o${maxID + 1}.json`, newOwner, (err) => {
      cb(null, newOwner);
    });
  });
};

const fetchAllOwners = (cb) => {
  let responseCount = 0;
  const allOwners = [];
  fs.readdir('./data/owners', (err, ownerFiles) => {
    ownerFiles.forEach((ownerFile, i) => {
      fs.readFile(`./data/owners/${ownerFile}`, 'utf8', (err, ownerStr) => {
        allOwners[i] = JSON.parse(ownerStr);
        if (++responseCount === ownerFiles.length) cb(null, allOwners);
      });
    });
  });
};

const fetchOwnerById = (id, cb) => {
  fs.readFile(`./data/owners/o${id}.json`, 'utf8', (err, fileContents) => {
    cb(null, JSON.parse(fileContents));
  });
};

const updateOwner = (id, data, cb) => {
  fs.readFile(`./data/owners/o${id}.json`, 'utf8', (err, fileContents) => {
    const patchedOwner = { ...JSON.parse(fileContents), ...data };
    fs.writeFile(`./data/owners/o${id}.json`, JSON.stringify(patchedOwner), (err) => {
      if (err) throw err;
      cb(null, patchedOwner);
    });
  });
};

const deleteOwnerById = (id, cb) => {
  fs.unlink(`./data/owners/o${id}`, (err) => {
    if (err) throw err;
    cb(null, `o${id} was successfully deleted...`);
  });
};

module.exports = {
  createOwner,
  fetchAllOwners,
  fetchOwnerById,
  updateOwner,
  deleteOwnerById,
};
