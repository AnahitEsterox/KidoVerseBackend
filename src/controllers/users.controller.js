const {
  findExistingUser,
  signUp,
  verifyEmail,
  isSignInAllowed,
  signIn,
} = require('../models/users/users.model');

const httpStatuses = require('../constants/httpStatuses');
const { userControllerMessages, smthWentWrong } = require('../constants/controllerMessages');

async function httpSignUp(req, res) {
  try {
    const user = req.body;
    const {
      fullName,
      email,
      password,
      confirmPassword,
    } = user;

    const existingUser = await findExistingUser(email);

    if (existingUser) {
      return res.status(httpStatuses.badRequest).json({
        success: false,
        message: userControllerMessages.alreadyExists,
        statusCode: httpStatuses.badRequest,
      });
    }

    if (password !== confirmPassword) {
      return res.status(httpStatuses.badRequest).json({
        success: false,
        message: userControllerMessages.passwordsDontMatch,
        statusCode: httpStatuses.badRequest,
      });
    }

    const responseEmail = await signUp(user);

    return res.status(httpStatuses.created).json({
      success: true,
      data: {
        email: responseEmail,
      },
      message: userControllerMessages.verifyEail,
      statusCode: httpStatuses.created,
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

async function httpVerifyEmail(req, res) {
  try {
    const { token } = req.params;
    const verifyEmailData = await verifyEmail(token);

    return res.status(httpStatuses.ok).json({
      success: true,
      data: verifyEmailData,
      message: userControllerMessages.emailVerified,
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

async function httpSignIn(req, res) {
  try {
    const { email, password } = req.body;

    const isSignInAllowedData = await isSignInAllowed(email, password);
  
    if (!isSignInAllowedData.isAllowed) {
      return res.status(httpStatuses.badRequest).json({
        success: false,
        message: isSignInAllowedData.reason,
        statusCode: httpStatuses.badRequest,
      });
    }
  
    const signInData = await signIn(email);
    
    return res.status(httpStatuses.ok).json({
      success: true,
      data: signInData,
      message: userControllerMessages.loginSuccess,
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

async function httpGetUser(req, res) {
  try {
    const user = req.user;

    return res.status(httpStatuses.ok).json({
      success: false,
      data: user,
      message: userControllerMessages.userReceived,
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
  httpSignUp,
  httpVerifyEmail,
  httpSignIn,
  httpGetUser,
};