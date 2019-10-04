const { readFile, readdir } = require('fs').promises;

const fetchAllOwners = async () => {
  const allOwnersFiles = await readdir(`./data/owners/`, 'utf-8');
  const allOwners = await allOwnersFiles.map ((owner) => {
    return fetchOwnerById(owner);
  });
  return Promise.all(allOwners);
};

const fetchOwnerById = async (ownerID) => {
   const ownerByID = await readFile(`./data/owners/${ownerID}.json`, 'utf-8').then(JSON.parse);
   return ownerByID;
};

module.exports = {
  fetchAllOwners,
  fetchOwnerById,
};
