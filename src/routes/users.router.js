const express = require('express');

const {
  httpSignUp,
  httpVerifyEmail,
  httpSignIn,
  httpGetUser,
} = require('../controllers/users.controller');

const { authMiddleware } = require('../middlewares/user.middleware');

const usersRouter = express.Router();

usersRouter.post('/sign-up', httpSignUp);
usersRouter.post('/verify-email/:token', httpVerifyEmail);
usersRouter.post('/sign-in', httpSignIn);
usersRouter.post('/users/me', authMiddleware, httpGetUser);

module.exports = usersRouter;