const fs = require('fs');

const createPet = (ownerId, data, cb) => {
  fs.readdir('./data/pets', (err, petFileNames) => {
    const maxID = Math.max(...petFileNames.map((petFile) => +petFile.match(/p(\d*)/)[1]));
    const newPet = { id: `p${maxID + 1}`, ...data, owner: `o${ownerId}` };
    fs.writeFile(`./data/pets/p${maxID + 1}.json`, JSON.stringify(newPet), () => {
      cb(null, newPet);
    });
  });
};

const fetchPetById = (id, cb) => {
  fs.readFile(`./data/pets/p${id}.json`, 'utf8', function(err, fileContents) {
    cb(null, JSON.parse(fileContents));
  });
};

const fetchPetsByOwnerId = (ownerId, cb) => {};

const deletePetById = (id, cb) => {
  fs.unlink(`./data/pets/p${id}`, function(err) {
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
