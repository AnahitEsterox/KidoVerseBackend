const Kid = require('./kids.mongo');

function isKidValid(kidData) {
  return !!kidData.fullName && !!kidData.dateOfBirth && !!kidData.userId;
}

async function createKid(kidData) {
  return await Kid.create(kidData);
}

async function getKids(userId) {
  return await Kid.find({ userId });
}

async function getKid(id) {
  return await Kid.findById(id);
}

async function deleteKid(id) {
  return await Kid.findByIdAndDelete(id);
}

async function updateKid(id, kidData) {
  await Kid.findByIdAndUpdate(id, kidData);

  return await getKid(id);
}

module.exports = {
  isKidValid,
  createKid,
  getKids,
  getKid,
  deleteKid,
  updateKid,
};
