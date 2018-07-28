const {
  ApiError,
  errorTypes,
  sendApiError,
  sendApiResponse,
} = require(`${__app}/controllers/helpers/api`);
const db = require(`${__app}/init/db`);

/**
 * Get authenticated customer
 * @route GET /v1/me
 *
 * @return {Response}
 */
module.exports = function (req, res, next) {
  res.body = {
    db: false,
  };

  return db
    .then(({ connection }) => {
      console.log('Connection has been established successfully.');
      res.body.db = Boolean(connection.readyState);
      // return sendApiResponse(res, services);
      return next();
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
      res.body.db = false;
      return next();
    });
};
