const express = require('express');

const {
  httpCreateKid,
  httpGetKids,
  httpGetKid,
  httpDeleteKid,
  httpUpdateKid,
} = require('../controllers/kids.controller');

const { authMiddleware } = require('../middlewares/user.middleware');

const kidsRouter = express.Router();

kidsRouter.post('/', authMiddleware, httpCreateKid);
kidsRouter.get('/', authMiddleware, httpGetKids);
kidsRouter.get('/:id', authMiddleware, httpGetKid);
kidsRouter.delete('/:id', authMiddleware, httpDeleteKid);
kidsRouter.put('/:id', authMiddleware, httpUpdateKid);

module.exports = kidsRouter;
