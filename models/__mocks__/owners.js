const fetchAllOwners = jest.fn((cb) => {
  cb(null, [
    {
      id: 'o1',
      name: 'Steve',
      age: 28,
    },
    {
      id: 'o2',
      name: 'Lucy',
      age: 19,
    },
    {
      id: 'o3',
      name: 'Gavin',
      age: 33,
    },
    {
      id: 'o4',
      name: 'Malcolm',
      age: 92,
    },
    {
      id: 'o5',
      name: 'Ronald',
      age: 57,
    },
  ]);
});

const fetchOwnerById = jest.fn((id, cb) => {
  cb(null, {
    id: `o${id}`,
    name: 'mitch',
    age: 1000,
  });
});

const createOwner = jest.fn((data, cb) => {
  cb(null, {
    id: 'o6',
    ...data,
  });
});

module.exports = { fetchAllOwners, fetchOwnerById, createOwner };
