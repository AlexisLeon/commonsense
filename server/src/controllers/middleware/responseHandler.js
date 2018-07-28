const { sendApiError, sendApiResponse } = require(`${__app}/controllers/helpers/api`);
const StoreRequest = require('./storeRequest');

module.exports = (req, res, next) => {
  if (!res.body) return next();

  StoreRequest(req, res);
  return sendApiResponse(res);
};
