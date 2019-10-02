const { fetchAllOwners, fetchOwnerById } = require('../models/owners');

const getOwners = (request, response) => {
  fetchAllOwners().then((owners) => {
    console.log(owners, '<--- owners');
    response.setHeader('content-type', 'application/json');
    response.write(JSON.stringify({ owners }));
    response.end();
  });
};

const getOwnerByID = (request, response) => {
  const [, ownerID] = request.url.match(/\/api\/owners\/(o\d+)/);
  fetchOwnerById(ownerID).then((owner) => {
    response.setHeader('content-type', 'application/json');
    response.write(JSON.stringify({ owner }));
    response.end();
  });
};

module.exports = { getOwners, getOwnerByID };
