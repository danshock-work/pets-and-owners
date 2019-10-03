const { readFile, readdir } = require('fs').promises;

const fetchPetByID = (petID, cb) => {
  return readFile(`./data/pets/${petID}.json`, 'utf-8').then(JSON.parse);
  };

const fetchPetsByOwnerId = (ownerID) => {
  return readdir(`./data/pets`)
  .then(petsAll => {
    return Promise.all(
      petsAll.map(pet => {
        const [petID] = pet.match(/(p\d+)/);
        return fetchPetByID(petID);
      })
    );
  }).then(pets => {
    return pets.filter(({owner}) => owner === ownerID)
  })
};

module.exports = {
  fetchPetByID,
  fetchPetsByOwnerId,
};
