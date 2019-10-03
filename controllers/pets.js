const { fetchPetByID, fetchPetsByOwnerID } = require('../models/pets.js');

const getPetByID = (request, response) => {
  const [, petID] = request.url.match(/\/api\/pets\/(p\d+)/);
  fetchPetByID(petID).then((pet) => {
    response.write(JSON.stringify({ pet }));
    response.setHeader('content-type', 'application/json');
    response.end();
  });
};

const getPetsByOwnerID = (request, response) => {};

module.exports = { getPetByID, getPetsByOwnerID };
