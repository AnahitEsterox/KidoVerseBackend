const userControllerMessages = {
  alreadyExists: 'User already exists.',
  passwordsDontMatch: 'Passwords don\'t match',
  pleaseVerifyYourEmail: 'Please verify your email.',
  verifyEail: 'Verification Message has successfully been sent.',
  emailVerified: 'Your Email has successfully verified.',
  invalidEmailOrPassword: 'Invalid Email or Password.',
  emailNotVerified: 'Email is not verified, please check your email and verify.',
  loginSuccess: 'You have successfully been logged in.',
  usersReceived: 'Users list received',
  userReceived: 'User received',
};

const kidControllerMessages = {
  created: 'Kid has successfully been created.',
  allFieldsRequired: 'Please provide all the informationa about the kid.',
  kidsReceived: 'Kids list received',
  kidReceived: 'Kid received',
  kidDeleted: 'Kid has successfully been deleted.',
  kidUpdated: 'Kid has successfully been updated.',
};

const wordsControllerMessages = {
  wordCreationNotAllowed: 'You are not allowed to create a word.',
  wordCreated: 'Word has successfully been created.',
  wordsReceived: 'Words list received',
  wordDeleted: 'Word has successfully been deleted.',
  wordUpdated: 'Word has successfully been updated.',
};

const smthWentWrong = 'Something went wrong.';

module.exports = {
  userControllerMessages,
  kidControllerMessages,
  wordsControllerMessages,
  smthWentWrong,
};
