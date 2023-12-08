const {
  isKidValid,
  createKid,
  getKids,
  getKid,
  deleteKid,
  updateKid,
} = require('../models/kids/kids.model');

const httpStatuses = require('../constants/httpStatuses');
const { smthWentWrong, kidControllerMessages } = require('../constants/controllerMessages');

async function httpCreateKid(req, res) {
  try {
    const kid = req.body;
    const userId = req.user.id;

    const kidData = {
      ...kid,
      userId,
    };

    const isKidCreationAllowed = isKidValid(kidData);

    if (!isKidCreationAllowed) {
      return res.status(httpStatuses.badRequest).json({
        success: false,
        message: kidControllerMessages.allFieldsRequired,
        statusCode: httpStatuses.badRequest,
      });
    }

    const newKid = await createKid(kidData);

    return res.status(httpStatuses.created).json({
      success: true,
      data: newKid,
      message: kidControllerMessages.created,
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

async function httpGetKids(req, res) {
  try {
    const userId = req.user.id;

    const kids = await getKids(userId);

    return res.status(httpStatuses.ok).json({
      success: true,
      data: kids,
      message: kidControllerMessages.kidsReceived,
      statusCode: httpStatuses.ok,
    })
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpGetKid(req, res) {
  try {
    const id = req.params.id;

    // TODO: if kid exists, get

    const kid = await getKid(id);

    return res.status(httpStatuses.ok).json({
      success: true,
      data: kid,
      message: kidControllerMessages.kidReceived,
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

async function httpDeleteKid(req, res) {
  try {
    const id = req.params.id;

    // TODO: if kid exists, delete

    await deleteKid(id);

    return res.status(httpStatuses.ok).json({
      success: true,
      data: {
        kidId: id,
      },
      message: kidControllerMessages.kidDeleted,
      statusCode: httpStatuses.ok,
    })
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    });
  }
}

async function httpUpdateKid(req, res) {
  try {
    const id = req.params.id;
    const kid = req.body;

    // TODO: if kid exists, update

    const updatedKid = await updateKid(id, kid);

    return res.status(httpStatuses.ok).json({
      success: true,
      data: updatedKid,
      message: kidControllerMessages.kidUpdated,
      statusCode: httpStatuses.ok,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatuses.serverError).json({
      success: false,
      message: error.message || smthWentWrong,
      statusCode: httpStatuses.serverError,
    })
  }
}


// TODO maybe separate method for updating avatar

module.exports = {
  httpCreateKid,
  httpGetKids,
  httpGetKid,
  httpDeleteKid,
  httpUpdateKid,
};
