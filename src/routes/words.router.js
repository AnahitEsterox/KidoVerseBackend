const express = require('express');

const {
  httpCreateWord,
  httpGetKidWords,
  httpGetWords,
  httpDeleteWord,
  httpUpdateWord,
} = require('../controllers/words.contoller')

const { authMiddleware } = require('../middlewares/user.middleware');

const wordsRouter = express.Router();

wordsRouter.post('/:kidId', authMiddleware, httpCreateWord);
wordsRouter.get('/:kidId', authMiddleware, httpGetKidWords);
wordsRouter.get('/', authMiddleware, httpGetWords);
wordsRouter.delete('/:id', authMiddleware, httpDeleteWord);
wordsRouter.put('/:id', authMiddleware, httpUpdateWord);

module.exports = wordsRouter;
