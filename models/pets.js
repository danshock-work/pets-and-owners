const { readFile, readdir } = require('fs');

const fetchPetByID = (petID, cb) => {
  return new Promise(() => {
    readFile(`./data/pets/${petID}.json`, 'utf8', (err, petJSON) => {
      cb(null, JSON.parse(petJSON));
    });
  });
};

const fetchPetsByOwnerId = (ownerID, cb) => {
  const petsForOwner = [];
  let petResponses = 0;
  readdir(`./data/pets`, (err, petNames) => {
    petNames.forEach((petName, i) => {
      readFile(`./data/pets/${petName}`, 'utf8', (err, petJSON) => {
        petResponses++;
        if (JSON.parse(petJSON).owner === ownerID) petsForOwner[i] = JSON.parse(petJSON);
        if (petResponses === petNames.length) cb(null, petsForOwner.filter((item) => item));
      });
    });
  });
};

module.exports = {
  fetchPetByID,
  fetchPetsByOwnerId,
};
