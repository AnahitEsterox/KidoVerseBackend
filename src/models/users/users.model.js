const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require('./users.mongo');
const transporter = require('../../utils/transporter');
const { userControllerMessages } = require('../../constants/controllerMessages');

async function findExistingUser(email) {
  return await User.findOne({ email });
}

async function signUp(userData) {
  const {
    fullName,
    email,
    password,
    confirmPassword,
  } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    fullName,
    isEmailVerified: false,
  });

  const verificationToken = jwt.sign({
    userId: user._id,
  }, process.env.JWT_SECRET);

  const verificationUrl = `${process.env.NODEMAILER_WEBSITE_URL}verify/${verificationToken}`;

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: userControllerMessages.pleaseVerifyYourEmail,
    html: `Please click this link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
  };

  let sendEmailError;

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      sendEmailError = error;
      return;
    }

    console.log(`Email sent: ${info.response}`);
  });

  if (sendEmailError) {
    console.log('if/sendEmailError', sendEmailError);
    throw new Error(sendEmailError);
  }

  await user.save();

  return email;
}

async function verifyEmail(token) {
  const { userId } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(userId);

  user.isEmailVerified = true;

  await user.save();

  return {
    token,
    isEmailVerified: true,
  };
}

async function isSignInAllowed(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    return {
      isAllowed: false,
      reason: userControllerMessages.invalidEmailOrPassword
    };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return {
      isAllowed: false,
      reason: userControllerMessages.invalidEmailOrPassword
    };
  }

  if (!user.isEmailVerified) {
    return {
      isAllowed: false,
      reason: userControllerMessages.emailNotVerified
    };
  }

  return {
    isAllowed: true,
  };
}

async function signIn(email) {
  const user = await User.findOne({ email });

  const userData = {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    photoUrl: user.photoUrl,
  };

  const accessToken = jwt.sign(userData, process.env.JWT_SECRET);

  return {
    userData,
    accessToken,
  };
}

module.exports = {
  findExistingUser,
  signUp,
  verifyEmail,
  isSignInAllowed,
  signIn,
};