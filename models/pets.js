const fs = require('fs');

const createPet = (ownerID, data, cb) => {};

const fetchPetById = (id, cb) => {
  fs.readFile(`./data/pets/p${id}.json`, 'utf8', (err, fileContents) => {
    cb(null, JSON.parse(fileContents));
  });
};

const fetchPetsByOwnerId = (ownerID, cb) => {
  fs.readdir('./data/pets', (err, petFileNames) => {
    const pets = [];
    let callCount = 0;
    petFileNames.forEach((petID, i) => {
      fs.readFile(`./data/pets/${petID}`, 'utf8', (err, pet) => {
        const parsedPet = JSON.parse(pet);
        if (parsedPet.owner === ownerID) {
          pets[i] = JSON.parse(pet);
        }
        if (++callCount === petFileNames.length) cb(null, pets.filter((x) => x));
      });
    });
  });
};

const deletePetById = (id, cb) => {
  fs.unlink(`./data/pets/p${id}`, (err) => {
    if (err) throw err;
    cb(null, `p${id} was successfully deleted...`);
  });
};

module.exports = {
  createPet,
  fetchPetById,
  fetchPetsByOwnerId,
  deletePetById,
};
