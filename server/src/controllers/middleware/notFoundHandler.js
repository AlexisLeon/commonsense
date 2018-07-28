const { ApiError, sendApiError, errorTypes } = require(`${__app}/controllers/helpers/api`);

module.exports = (req, res, next) => {
  // const err = 
  throw new ApiError('Forbidden', {
    status: 403,
    type: errorTypes.AUTHENTICATION_ERROR,
  })

  // return sendApiError(res, err);
};
