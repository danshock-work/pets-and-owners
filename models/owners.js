const { readFile, readdir } = require('fs').promises;

const fetchAllOwners = async () => {
  let files = await readdir(`./data/owners`);
  let promisedOwners = files.map(async (file) => {
    let ownerJSON = await readFile(`./data/owners/${file}`, 'utf-8');
    return JSON.parse(ownerJSON);
  });

  return await Promise.all(promisedOwners);
};

const fetchOwnerById = async (ownerID) => {
   const ownerByID = await readFile(`./data/owners/${ownerID}.json`, 'utf-8').then(JSON.parse);
   return ownerByID;
};

module.exports = {
  fetchAllOwners,
  fetchOwnerById,
};
