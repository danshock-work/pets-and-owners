const { fetchPetByID, fetchPetsByOwnerID } = require('../models/pets.js');

const getPetByID = (request, response) => {
  const [, petID] = request.url.match(/\/api\/pets\/(p\d+)/);
  fetchPetByID(petID).then((pet) => {
    response.setHeader('content-type', 'application/json');
    response.write(JSON.stringify({ pet }));
    response.end();
  });
};

const getPetsByOwnerID = (request, response) => {
  const [, ownerID] = request.url.match(/\/api\/owners\/(o\d+)\/pets/);
  fetchPetsByOwnerID(ownerID).then((petsForOwner) => {
    response.setHeader('content-type', 'application/json');
    response.write(JSON.stringify({ pets: petsForOwner }));
    response.end();
  });
};

module.exports = { getPetByID, getPetsByOwnerID };
