const Word = require('./words.mongo');

function isWordValid(word) {
  return !!word.original && !!word.kido && !!word.userId && !!word.kidId;
}

async function getWord(id) {
  return await Word.findById(id);
}

async function createWord(word) {
  return await Word.create(word);
}

async function getKidWords(kidId) {
  return await Word.find({ kidId });
}

async function getWords(userId) {
  return await Word.find({ userId });
}

async function deleteWord(id) {
  return await Word.findByIdAndDelete(id);
}

async function updateWord(id, wordData) {
  await Word.findByIdAndUpdate(id, wordData);

  return await getWord(id);
}

module.exports = {
  isWordValid,
  createWord,
  getKidWords,
  getWords,
  deleteWord,
  updateWord,
};
