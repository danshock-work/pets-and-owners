const { readFile, readdir } = require('fs').promises;

const fetchPetByID = async (petID) => {
  let petJSON = await readFile(`./data/pets/${petID}.json`, 'utf-8');
  return JSON.parse(petJSON);
  };

const fetchPetsByOwnerId = async (ownerID) => {
  const petFiles = await readdir("./data/pets");
  const promisedPets = petFiles.map(async (file) => {
    let petJSON = await readFile(`./data/pets/${file}`, "utf-8");
    return JSON.parse(petJSON);
  });
  const pets = await Promise.all(promisedPets);
  return pets.filter(({ owner }) => owner === ownerID);
};


// const fetchPetsByOwnerId = (ownerID) => {
//   return readdir(`./data/pets`)
//   .then(petsAll => {
//     return Promise.all(
//       petsAll.map(pet => {
//         const [petID] = pet.match(/(p\d+)/);
//         return fetchPetByID(petID);
//       })
//     );
//   }).then(pets => {
//     return pets.filter(({owner}) => owner === ownerID)
//   })
// };

module.exports = {
  fetchPetByID,
  fetchPetsByOwnerId,
};
