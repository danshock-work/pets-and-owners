const { readFile, readdir } = require('fs').promises;

const fetchPetByID = (petID, cb) => {
  return readFile(`./data/pets/${petID}.json`, 'utf8').then((petJSON) => JSON.parse(petJSON));
};

const fetchPetsByOwnerId = (ownerID) => {
  return readdir(`./data/pets`)
    .then((petFiles) => {
      const promisedPets = petFiles.map((petFile) => readFile(`./data/pets/${petFile}`, 'utf8'));
      return Promise.all(promisedPets);
    })
    .then((pets) => pets.filter((petJSON) => JSON.parse(petJSON).owner === ownerID).map((item) => JSON.parse(item)));
};

module.exports = {
  fetchPetByID,
  fetchPetsByOwnerId,
};
