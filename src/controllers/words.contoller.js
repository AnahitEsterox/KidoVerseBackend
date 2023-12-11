const {
  isWordValid,
  createWord,
  getKidWords,
  getWords,
  deleteWord,
  updateWord,
} = require('../models/words/words.model');

const httpStatuses = require('../constants/httpStatuses');
const { smthWentWrong, wordsControllerMessages } = require('../constants/controllerMessages');

async function httpCreateWord(req, res) {
  try {
    const word = req.body;
    const userId = req.user.id;
    const kidId = req.params.kidId;

    const newWord = {
      ...word,
      userId,
      kidId,
    };

    const isWordCreationAllowed = isWordValid(newWord);

    if (!isWordCreationAllowed) {
      return res.status(httpStatuses.badRequest).json({
        success: false,
        message: wordsControllerMessages.wordCreationNotAllowed,
        statusCode: httpStatuses.badRequest,
      });
    }

    const createdWord = await createWord(newWord);

    return res.status(httpStatuses.created).json({
      success: true,
      message: wordsControllerMessages.wordCreated,
      statusCode: httpStatuses.created,
      data: createdWord,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpGetKidWords(req, res) {
  try {
    const kidId = req.params.kidId;

    // TODO: check if kidId is valid

    const words = await getKidWords(kidId);

    return res.status(httpStatuses.ok).json({
      success: true,
      message: wordsControllerMessages.wordsReceived,
      statusCode: httpStatuses.ok,
      data: words,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpGetWords(req, res) {
  try {
    const userId = req.user.id;

    const words = await getWords(userId);

    return res.status(httpStatuses.ok).json({
      success: true,
      message: wordsControllerMessages.wordsReceived,
      statusCode: httpStatuses.ok,
      data: words,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpDeleteWord(req, res) {
  try {
    const id = req.params.id;

    // TODO: if word exists, delete

    await deleteWord(id);

    return res.status(httpStatuses.ok).json({
      success: true,
      data: {
        wordId: id,
      },
      message: wordsControllerMessages.wordDeleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpUpdateWord(req, res) {
  try {
    const id = req.params.id;
    const word = req.body;

    // TODO: if word exists, update

    const updatedWord = await updateWord(id, word);

    return res.status(httpStatuses.ok).json({
      success: true,
      data: updatedWord,
      message: wordsControllerMessages.wordUpdated,
      statusCode: httpStatuses.ok,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

module.exports = {
  httpCreateWord,
  httpGetKidWords,
  httpGetWords,
  httpDeleteWord,
  httpUpdateWord,
};
