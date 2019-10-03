const { fetchAllOwners, fetchOwnerById } = require('../models/owners');

const getOwners = (request, response) => {
  fetchAllOwners().then((owners) => {
    response.write(JSON.stringify({ owners }));
    response.setHeader('content-type', 'application/json');
    response.end();
  });
};

const getOwnerByID = (request, response) => {
  const [, ownerID] = request.url.match(/\/api\/owners\/(o\d+)/);
  fetchOwnerById(ownerID).then((owner) => {
    response.write(JSON.stringify({ owner }));
    response.setHeader('content-type', 'application/json');
    response.end();
  });
};

module.exports = { getOwners, getOwnerByID };
